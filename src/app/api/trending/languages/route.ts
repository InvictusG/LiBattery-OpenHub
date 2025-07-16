import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch(
      "https://trendings.herokuapp.com/lang",
      {
        next: { revalidate: 3600 * 24 }, // 24 hours
      }
    );

    if (!response.ok) {
       console.error(`Error fetching trending languages: ${response.status} ${response.statusText}`);
       return NextResponse.json({ success: false, data: [], message: 'Failed to fetch languages' }, { status: 200 });
    }

    const data = await response.json();
    // The new API provides an array of objects, we need to extract the `name` property
    const languageNames = data.items.map((lang: { name: string, url:string }) => lang.name);
    return NextResponse.json({ success: true, data: languageNames });

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