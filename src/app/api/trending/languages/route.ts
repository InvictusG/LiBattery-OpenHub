import { NextResponse } from 'next/server';

// This route fetches the available programming languages for the trending filter.
export async function GET() {
  try {
    const response = await fetch(
      "https://api.g-trends.vercel.app/languages",
      {
        next: { revalidate: 3600 * 24 }, // 24 hours
      }
    );

    if (!response.ok) {
      // Return an empty array or a default list if the API fails
      return NextResponse.json([], {
        status: response.status,
        statusText: response.statusText,
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch trending languages:", error);
    // Return an empty array or a default list in case of any exception
    return NextResponse.json([], {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
} 