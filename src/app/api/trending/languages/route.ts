import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch(
      "https://api.g-trends.vercel.app/languages",
      {
        next: { revalidate: 3600 * 24 }, // 24 hours
      }
    );

    if (!response.ok) {
       console.error(`Error fetching trending languages: ${response.status} ${response.statusText}`);
       return NextResponse.json({ success: false, data: [], message: 'Failed to fetch languages' }, { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data: data });

  } catch (error) {
    console.error("Failed to fetch trending languages:", error);
    return NextResponse.json(
        {
          success: false,
          data: [],
          message: "An unexpected error occurred.",
        },
        { status: 200 }
      );
  }
} 