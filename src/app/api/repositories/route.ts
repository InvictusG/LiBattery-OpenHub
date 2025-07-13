import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Repository from '@/lib/models/Repository'
import { ApiResponse, SearchFilters } from '@/types'

export async function GET(request: NextRequest) {
  try {
    // 检查是否有MongoDB连接字符串
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: false,
        message: 'Database not configured. This is a demo deployment.',
        data: {
          repositories: [],
          total: 0,
          page: 1,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      })
    }

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
      filters.language = { $regex: new RegExp(language, 'i') }
    }

    if (query) {
      filters.$or = [
        { name: { $regex: new RegExp(query, 'i') } },
        { description: { $regex: new RegExp(query, 'i') } },
        { topics: { $elemMatch: { $regex: new RegExp(query, 'i') } } }
      ]
    }

    if (minStars) {
      filters.stars = { ...filters.stars, $gte: parseInt(minStars) }
    }

    if (maxStars) {
      filters.stars = { ...filters.stars, $lte: parseInt(maxStars) }
    }

    if (hasLicense !== null) {
      if (hasLicense === 'true') {
        filters.license = { $nin: [null, ''] }
      } else if (hasLicense === 'false') {
        filters.$or = [
          { license: null },
          { license: '' }
        ]
      }
    }

    if (isArchived !== null) {
      filters.archived = isArchived === 'true'
    }

    // 构建排序条件
    const sortOptions: any = {}
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1

    // 计算分页
    const skip = (page - 1) * limit

    // 执行查询
    const repositories = await Repository
      .find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Repository.countDocuments(filters)
    const totalPages = Math.ceil(total / limit)

    const response: ApiResponse = {
      success: true,
      data: {
        repositories,
        total,
        page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: {
        repositories: [],
        total: 0,
        page: 1,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // 检查是否有MongoDB连接字符串
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: false,
        message: 'Database not configured. This is a demo deployment.'
      }, { status: 503 })
    }

    await connectToDatabase()

    const body = await request.json()
    const { repositories } = body

    if (!Array.isArray(repositories)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid data format'
      }, { status: 400 })
    }

    // 批量插入或更新仓库数据
    const bulkOps = repositories.map(repo => ({
      updateOne: {
        filter: { githubId: repo.githubId },
        update: { $set: repo },
        upsert: true
      }
    }))

    const result = await Repository.bulkWrite(bulkOps)

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${repositories.length} repositories`,
      data: {
        inserted: result.upsertedCount,
        updated: result.modifiedCount,
        total: repositories.length
      }
    })

  } catch (error) {
    console.error('Bulk insert error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to process repositories'
    }, { status: 500 })
  }
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