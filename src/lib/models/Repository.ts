import mongoose, { Document, Schema } from 'mongoose'
import { BatteryCategory } from '@/types'

export interface RepositoryDocument extends Document {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  ssh_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  size: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
  } | null
  owner: {
    login: string
    id: number
    avatar_url: string
    html_url: string
    type: string
  } | null
  created_at: string
  updated_at: string
  pushed_at: string
  archived: boolean
  disabled: boolean
  visibility: string
  default_branch: string
  category: BatteryCategory
  tags: string[]
  featured: boolean
  ai_summary?: string
  relevance_score?: number
  last_synced: string
}

const repositorySchema = new Schema<RepositoryDocument>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    full_name: { type: String, required: true },
    description: { type: String, default: null },
    html_url: { type: String, required: true },
    clone_url: { type: String, required: true },
    ssh_url: { type: String, required: true },
    homepage: { type: String, default: null },
    language: { type: String, default: null },
    topics: [{ type: String }],
    stargazers_count: { type: Number, default: 0 },
    watchers_count: { type: Number, default: 0 },
    forks_count: { type: Number, default: 0 },
    open_issues_count: { type: Number, default: 0 },
    size: { type: Number, default: 0 },
    license: {
      key: { type: String, default: null },
      name: { type: String, default: null },
      spdx_id: { type: String, default: null },
      url: { type: String, default: null },
    },
    owner: {
      login: { type: String },
      id: { type: Number },
      avatar_url: { type: String },
      html_url: { type: String },
      type: { type: String },
    },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
    pushed_at: { type: String, required: true },
    archived: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    visibility: { type: String, default: 'public' },
    default_branch: { type: String, default: 'main' },
    // 自定义字段
    category: {
      type: String,
      enum: Object.values(BatteryCategory),
      default: BatteryCategory.OTHER,
    },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    ai_summary: { type: String, default: null },
    relevance_score: { type: Number, default: 0 },
    last_synced: { type: String, default: () => new Date().toISOString() },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc: any, ret: any) => {
        ret._id = ret._id.toString()
        return ret
      },
    },
  }
)

// 创建索引
repositorySchema.index({ id: 1 })
repositorySchema.index({ full_name: 1 })
repositorySchema.index({ category: 1 })
repositorySchema.index({ stargazers_count: -1 })
repositorySchema.index({ updated_at: -1 })
repositorySchema.index({ featured: 1 })
repositorySchema.index({ 'owner.login': 1 })
repositorySchema.index({ topics: 1 })
repositorySchema.index({ language: 1 })

// 文本搜索索引
repositorySchema.index({
  name: 'text',
  description: 'text',
  'owner.login': 'text',
  topics: 'text',
})

// 静态方法
repositorySchema.statics.findByCategory = function (category: BatteryCategory) {
  return this.find({ category })
}

repositorySchema.statics.findFeatured = function () {
  return this.find({ featured: true }).sort({ stargazers_count: -1 })
}

repositorySchema.statics.findTrending = function (limit: number = 10) {
  return this.find({ archived: false })
    .sort({ stargazers_count: -1, updated_at: -1 })
    .limit(limit)
}

repositorySchema.statics.searchRepositories = function (
  query: string,
  filters: any = {},
  options: any = {}
) {
  const searchQuery: any = { ...filters }

  if (query) {
    searchQuery.$text = { $search: query }
  }

  return this.find(searchQuery)
    .sort(options.sort || { stargazers_count: -1 })
    .limit(options.limit || 20)
    .skip(options.skip || 0)
}

export default mongoose.models.Repository || mongoose.model<RepositoryDocument>('Repository', repositorySchema) 