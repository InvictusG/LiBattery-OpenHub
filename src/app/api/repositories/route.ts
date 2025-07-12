import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Repository from '@/lib/models/Repository'
import { ApiResponse, SearchFilters } from '@/types'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category')
    const language = searchParams.get('language')
    const minStars = searchParams.get('minStars')
    const maxStars = searchParams.get('maxStars')
    const hasLicense = searchParams.get('hasLicense')
    const isArchived = searchParams.get('isArchived')
    const sortBy = searchParams.get('sortBy') || 'stars'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // 构建查询条件
    const filters: any = {}

    if (category) {
      filters.category = category
    }

    if (language) {
      filters.language = language
    }

    if (minStars) {
      filters.stargazers_count = { $gte: parseInt(minStars) }
    }

    if (maxStars) {
      filters.stargazers_count = { 
        ...filters.stargazers_count, 
        $lte: parseInt(maxStars) 
      }
    }

    if (hasLicense === 'true') {
      filters['license.key'] = { $ne: null }
    } else if (hasLicense === 'false') {
      filters['license.key'] = null
    }

    if (isArchived === 'true') {
      filters.archived = true
    } else if (isArchived === 'false') {
      filters.archived = false
    }

    // 构建排序条件
    const sortOptions: any = {}
    if (sortBy === 'stars') {
      sortOptions.stargazers_count = sortOrder === 'desc' ? -1 : 1
    } else if (sortBy === 'updated') {
      sortOptions.updated_at = sortOrder === 'desc' ? -1 : 1
    } else if (sortBy === 'created') {
      sortOptions.created_at = sortOrder === 'desc' ? -1 : 1
    } else if (sortBy === 'relevance' && query) {
      sortOptions.score = { $meta: 'textScore' }
    }

    // 执行搜索
    let repositories
    let total

    if (query) {
      // 文本搜索
      filters.$text = { $search: query }
      repositories = await Repository.find(filters, { score: { $meta: 'textScore' } })
        .sort(sortOptions)
        .limit(limit)
        .skip((page - 1) * limit)
      
      total = await Repository.countDocuments(filters)
    } else {
      // 普通查询
      repositories = await Repository.find(filters)
        .sort(sortOptions)
        .limit(limit)
        .skip((page - 1) * limit)
      
      total = await Repository.countDocuments(filters)
    }

    const response: ApiResponse = {
      success: true,
      data: {
        repositories,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        filters: {
          query,
          category,
          language,
          minStars: minStars ? parseInt(minStars) : undefined,
          maxStars: maxStars ? parseInt(maxStars) : undefined,
          hasLicense: hasLicense === 'true' ? true : hasLicense === 'false' ? false : undefined,
          isArchived: isArchived === 'true' ? true : isArchived === 'false' ? false : undefined,
          sortBy,
          sortOrder,
          page,
          limit,
        },
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = await request.json()
    const { repositories } = body

    if (!repositories || !Array.isArray(repositories)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
          message: 'repositories array is required',
        },
        { status: 400 }
      )
    }

    const results = []
    for (const repo of repositories) {
      try {
        const existingRepo = await Repository.findOne({ id: repo.id })
        if (existingRepo) {
          // 更新现有仓库
          const updatedRepo = await Repository.findOneAndUpdate(
            { id: repo.id },
            { ...repo, last_synced: new Date().toISOString() },
            { new: true }
          )
          results.push(updatedRepo)
        } else {
          // 创建新仓库
          const newRepo = new Repository({
            ...repo,
            last_synced: new Date().toISOString(),
          })
          const savedRepo = await newRepo.save()
          results.push(savedRepo)
        }
      } catch (error) {
        console.error(`Error processing repository ${repo.id}:`, error)
        continue
      }
    }

    const response: ApiResponse = {
      success: true,
      data: results,
      message: `Successfully processed ${results.length} repositories`,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
} 