import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, GitHubRepository, Repository } from '@/types';

// Helper function to transform GitHub API response to our Repository type
const transformRepository = (repo: GitHubRepository): Repository => ({
  id: repo.id,
  name: repo.name,
  full_name: repo.full_name,
  description: repo.description || 'No description provided.',
  language: repo.language || 'N/A',
  stars: repo.stargazers_count,
  forks: repo.forks || 0, // Corrected from forks_count to forks
  updated_at: repo.updated_at,
  topics: repo.topics || [],
  category: repo.topics?.includes('bms') ? 'BMS' : 'OTHER', // Simple categorization
  html_url: repo.html_url,
  license: repo.license ? { name: repo.license.name } : null,
  archived: repo.archived || false,
  owner: {
    login: repo.owner?.login || 'unknown',
    avatar_url: repo.owner?.avatar_url || '',
  },
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'battery'; // Default query to 'battery'
  const sort = searchParams.get('sort') || 'stars';
  const order = searchParams.get('order') || 'desc';
  const per_page = parseInt(searchParams.get('per_page') || '30', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Construct the GitHub API search query
  const searchQuery = `q=${encodeURIComponent(q)}+in:name,description,topics&sort=${sort}&order=${order}&per_page=${per_page}&page=${page}`;
  const GITHUB_API_URL = `https://api.github.com/search/repositories?${searchQuery}`;
  
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({
      success: false,
      message: "GitHub token is not configured. Please set GITHUB_TOKEN in your .env.local file.",
      data: { repositories: [], total: 0, page: 1, totalPages: 1 }
    }, { status: 500 });
  }

  try {
    const apiResponse = await fetch(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      console.error('GitHub API Error:', errorData);
      return NextResponse.json({
        success: false,
        message: `GitHub API error: ${errorData.message || 'Unknown error'}`,
        data: { repositories: [], total: 0, page: 1, totalPages: 1 }
      }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    const repositories: Repository[] = data.items.map(transformRepository);
    const total = data.total_count;
    const totalPages = Math.ceil(total / per_page);

    const response: ApiResponse<{ repositories: Repository[], total: number, page: number, totalPages: number }> = {
      success: true,
      data: {
        repositories,
        total,
        page,
        totalPages,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({
      success: false,
      message: 'An internal server error occurred.',
      data: { repositories: [], total: 0, page: 1, totalPages: 1 }
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}

// 处理其他HTTP方法
export async function PUT(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed'
  }, { status: 405 })
} 