import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { unstable_cache as cache } from 'next/cache';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Cache the function for 6 hours
const getStats = cache(
  async () => {
    try {
      // Fetch a curated list of highly-starred battery-related repositories
      const { data: searchResult } = await octokit.search.repos({
        q: 'battery in:description,readme,name sort:stars',
        per_page: 100, // Fetch top 100 to get a good sample size
      });

      const repositories = searchResult.items;

      if (!repositories || repositories.length === 0) {
        throw new Error("No repositories found to calculate stats.");
      }

      const totalProjects = searchResult.total_count;
      const totalStars = repositories.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      const totalForks = repositories.reduce((acc, repo) => acc + repo.forks_count, 0);

      const languages = repositories.map(repo => repo.language).filter(Boolean);
      const uniqueLanguages = [...new Set(languages)];

      // Fetch categories from our own API (assuming it's available)
      // Note: This creates a dependency, ensure the categories API is robust.
      // For now, we hardcode to avoid circular dependency issues during build.
      const uniqueCategories = [
        { id: "bms", name: "电池管理系统 (BMS)" },
        { id: "simulation", name: "仿真与模拟" },
        { id: "diagnostics", name: "诊断与寿命预测" },
        { id: "data", name: "数据集与分析" },
        { id: "thermal", name: "热管理" },
        { id: "hardware", name: "开源硬件" },
      ];

      return {
        totalProjects,
        totalStars,
        totalForks,
        uniqueLanguages,
        uniqueCategories,
      };
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      throw new Error('Failed to fetch stats from GitHub.');
    }
  },
  ['github-stats'],
  { revalidate: 21600 } // Revalidate every 6 hours
);


export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
} 