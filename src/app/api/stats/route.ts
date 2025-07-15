import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { categories } from '@/lib/categories';
import { ApiResponse } from '@/types';

// Initialize Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    // 1. Get total project count
    const totalProjectsResponse = await octokit.search.repos({
      q: 'battery in:name,description,topics',
      per_page: 1, // We only need the total count
    });
    const totalProjects = totalProjectsResponse.data.total_count;

    // 2. Get repos to calculate unique languages and categories
    const reposForStatsResponse = await octokit.search.repos({
      q: 'battery in:name,description,topics',
      sort: 'stars',
      order: 'desc',
      per_page: 100, // Fetch top 100 to get a good sample for stats
    });
    const repos = reposForStatsResponse.data.items;

    // 3. Calculate unique languages
    const languages = new Set<string>();
    repos.forEach(repo => {
      if (repo.language) {
        languages.add(repo.language);
      }
    });
    const uniqueLanguages = Array.from(languages).sort();

    // 4. Populate unique categories from our predefined list
    const categoryCountMap: { [key: string]: number } = {};
    categories.forEach(cat => categoryCountMap[cat.id] = 0);
    
    repos.forEach(repo => {
        const repoTopics = repo.topics || [];
        for (const category of categories) {
            // Check if any of the category id is in the repo topics
            // e.g. category id 'bms' is in topics ['bms', 'battery']
            if (repoTopics.includes(category.id)) {
                categoryCountMap[category.id]++;
                // a repo can belong to multiple categories, so don't break
            }
        }
    });

    const uniqueCategories = categories.map(cat => ({
        ...cat,
        repositories: categoryCountMap[cat.id] || 0,
    })).filter(cat => cat.id !== 'other'); // Exclude 'other' from filters, but it can be used for categorization

    // 5. Calculate total stars from the fetched repos (as an approximation)
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

    const response: ApiResponse<{
      totalProjects: number;
      totalStars: number;
      uniqueLanguages: string[];
      uniqueCategories: typeof uniqueCategories;
    }> = {
      success: true,
      data: {
        totalProjects,
        totalStars,
        uniqueLanguages,
        uniqueCategories,
      },
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('API Stats Error:', error);
    return NextResponse.json({
      success: false,
      message: `An internal server error occurred: ${error.message}`,
    }, { status: 500 });
  }
} 