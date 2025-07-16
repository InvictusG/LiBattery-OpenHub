import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sub, formatISO } from 'date-fns';

export const dynamic = 'force-dynamic';

// A function to get the date range for the GitHub query
function getStartDate(since: string): string {
  const now = new Date();
  let startDate: Date;

  switch (since) {
    case 'weekly':
      startDate = sub(now, { weeks: 1 });
      break;
    case 'monthly':
      startDate = sub(now, { months: 1 });
      break;
    case 'daily':
    default:
      startDate = sub(now, { days: 1 });
      break;
  }
  // Format for GitHub API: YYYY-MM-DD
  return formatISO(startDate, { representation: 'date' });
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get('since') || 'daily';
  const language = searchParams.get('language') || '';

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'GitHub token not configured on server' },
      { status: 200 } // Return 200 to prevent client crash
    );
  }

  const startDate = getStartDate(since);
  
  let query = `created:>${startDate}`;
  if (language) {
    query += ` language:"${language}"`;
  }

  const apiUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=30`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'LiBattery-OpenHub',
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('GitHub API Error:', errorData.message);
      return NextResponse.json(
        { success: false, message: `GitHub API Error: ${errorData.message || res.statusText}` },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data.items }, { status: 200 });

  } catch (error: any) {
    console.error('An unexpected error occurred in /api/trending:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'An unexpected server error occurred.' },
      { status: 200 }
    );
  }
} 