import { NextResponse } from 'next/server';

// This route fetches the available programming languages for the trending filter.
export async function GET() {
  const apiUrl = `https://api.g-trends.vercel.app/languages`;

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!res.ok) {
      console.error(`Error fetching trending languages: ${res.status} ${res.statusText}`);
      return NextResponse.json({ success: false, message: 'Failed to fetch languages' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data.data); // The external API nests the data
  } catch (error) {
    console.error('An unexpected error occurred in /api/trending/languages:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
} 