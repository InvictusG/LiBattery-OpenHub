import { NextResponse } from 'next/server';

// This is a proxy route to avoid CORS issues and to potentially add caching in the future.
// It fetches data from a reliable third-party public API that scrapes GitHub's trending page.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get('since') || 'daily';
  const language = searchParams.get('language');

  let apiUrl = `https://api.g-trends.vercel.app/repositories?since=${since}`;
  if (language) {
    apiUrl += `&language=${encodeURIComponent(language)}`;
  }

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error fetching trending repos: ${res.status} ${res.statusText}`, errorText);
      return NextResponse.json({ success: false, message: `Failed to fetch trending data: ${res.statusText}` }, { status: res.status });
    }
    
    const data = await res.json();
    
    // The external API nests the data, so we extract it.
    const repositories = data.data;

    // We need to transform the data slightly to match our existing `Repository` type.
    const transformedData = repositories.map((repo: any) => ({
      id: repo.url, // No stable ID, using url
      name: repo.name,
      full_name: `${repo.author}/${repo.name}`,
      owner: {
        login: repo.author,
        avatar_url: repo.avatar,
      },
      html_url: repo.url,
      description: repo.description,
      stars: repo.stars,
      forks: repo.forks,
      language: repo.language || 'N/A',
      category: 'Trending', // Assign a default category
      topics: repo.tags || [],
    }));

    return NextResponse.json({ success: true, data: transformedData });
  } catch (error) {
    console.error('An unexpected error occurred in /api/trending:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 