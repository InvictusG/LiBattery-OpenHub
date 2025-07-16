import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'; // force dynamic behavior

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get("since") || "daily";
  const language = searchParams.get("language") || "";

  let apiUrl = `https://api.g-trends.vercel.app/repositories?since=${since}`;
  if (language) {
    apiUrl += `&language=${encodeURIComponent(language)}`;
  }

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Error fetching trending data from external API: ${res.status} ${res.statusText}`,
        errorText
      );
      return NextResponse.json(
        {
          success: false,
          message: `获取外部热门数据失败 (状态: ${res.status})`,
          data: [],
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data: data }, { status: 200 });

  } catch (error) {
    console.error(
      "An unexpected error occurred in /api/trending:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        message: "服务器发生未知错误。",
        data: [],
      },
      { status: 200 }
    );
  }
} 