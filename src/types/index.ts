// 仓库相关类型
export interface Repository {
  _id?: string
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
  // 自定义字段
  category: BatteryCategory
  tags: string[]
  featured: boolean
  ai_summary?: string
  relevance_score?: number
  last_synced: string
}

// 电池相关分类
export enum BatteryCategory {
  CELL_DESIGN = 'cell_design',           // 电芯设计
  LIFE_PREDICTION = 'life_prediction',   // 寿命预测
  BMS = 'bms',                          // 电池管理系统
  SIMULATION = 'simulation',             // 模拟工具
  THERMAL = 'thermal',                   // 热管理
  SAFETY = 'safety',                     // 安全相关
  MATERIALS = 'materials',               // 材料科学
  MANUFACTURING = 'manufacturing',       // 制造工艺
  TESTING = 'testing',                   // 测试工具
  DATA_ANALYSIS = 'data_analysis',       // 数据分析
  MODELING = 'modeling',                 // 建模工具
  OPTIMIZATION = 'optimization',         // 优化算法
  OTHER = 'other'                        // 其他
}

// 分类标签映射
export const CategoryLabels: Record<BatteryCategory, string> = {
  [BatteryCategory.CELL_DESIGN]: '电芯设计',
  [BatteryCategory.LIFE_PREDICTION]: '寿命预测',
  [BatteryCategory.BMS]: '电池管理系统',
  [BatteryCategory.SIMULATION]: '模拟工具',
  [BatteryCategory.THERMAL]: '热管理',
  [BatteryCategory.SAFETY]: '安全相关',
  [BatteryCategory.MATERIALS]: '材料科学',
  [BatteryCategory.MANUFACTURING]: '制造工艺',
  [BatteryCategory.TESTING]: '测试工具',
  [BatteryCategory.DATA_ANALYSIS]: '数据分析',
  [BatteryCategory.MODELING]: '建模工具',
  [BatteryCategory.OPTIMIZATION]: '优化算法',
  [BatteryCategory.OTHER]: '其他'
}

// 搜索相关类型
export interface SearchFilters {
  query?: string
  category?: BatteryCategory
  language?: string
  minStars?: number
  maxStars?: number
  hasLicense?: boolean
  isArchived?: boolean
  sortBy?: 'stars' | 'updated' | 'created' | 'relevance'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface SearchResult {
  repositories: Repository[]
  total: number
  page: number
  totalPages: number
  filters: SearchFilters
}

// 用户相关类型
export interface User {
  _id?: string
  id: string
  username: string
  email: string
  avatar_url?: string
  bio?: string
  github_username?: string
  role: 'user' | 'admin' | 'moderator'
  favorites: string[] // Repository IDs
  contributions: Contribution[]
  created_at: string
  updated_at: string
  last_login?: string
}

// 贡献类型
export interface Contribution {
  _id?: string
  user_id: string
  type: 'repository_submission' | 'category_suggestion' | 'tag_suggestion' | 'bug_report'
  repository_id?: string
  title: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  admin_comment?: string
  created_at: string
  updated_at: string
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// GitHub API 相关类型
export interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubRepository[]
}

export interface GitHubRepository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GitHubUser | null
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  has_issues?: boolean
  has_projects?: boolean
  has_wiki?: boolean
  has_pages?: boolean
  has_downloads?: boolean
  archived?: boolean
  disabled?: boolean
  open_issues_count: number
  license: GitHubLicense | null
  allow_forking?: boolean
  is_template?: boolean
  web_commit_signoff_required?: boolean
  topics?: string[]
  visibility?: string
  forks?: number
  open_issues?: number
  watchers?: number
  default_branch?: string
  score?: number
}

export interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface GitHubLicense {
  key: string
  name: string
  spdx_id: string | null
  url: string | null
  node_id: string
  html_url?: string
}

// 统计相关类型
export interface Statistics {
  total_repositories: number
  total_stars: number
  total_forks: number
  categories: Record<BatteryCategory, number>
  languages: Record<string, number>
  trending_repositories: Repository[]
  recent_updates: Repository[]
}

// 主题相关类型
export interface Theme {
  name: string
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
} 