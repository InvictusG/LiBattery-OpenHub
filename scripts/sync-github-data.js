const { Octokit } = require('@octokit/rest')
const mongoose = require('mongoose')
require('dotenv').config()

// GitHub API 客户端
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

// 连接到 MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }
}

// 定义仓库模型
const repositorySchema = new mongoose.Schema({
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
    login: { type: String, required: true },
    id: { type: Number, required: true },
    avatar_url: { type: String, required: true },
    html_url: { type: String, required: true },
    type: { type: String, required: true },
  },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
  pushed_at: { type: String, required: true },
  archived: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  visibility: { type: String, default: 'public' },
  default_branch: { type: String, default: 'main' },
  // 自定义字段
  category: { type: String, default: 'other' },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  ai_summary: { type: String, default: null },
  relevance_score: { type: Number, default: 0 },
  last_synced: { type: String, default: () => new Date().toISOString() },
}, {
  timestamps: true,
})

const Repository = mongoose.models.Repository || mongoose.model('Repository', repositorySchema)

// 电池相关关键词
const BATTERY_KEYWORDS = [
  'lithium-ion battery',
  'battery management system',
  'BMS',
  'battery modeling',
  'battery simulation',
  'electrochemistry',
  'battery data',
  'battery prediction',
  'battery thermal',
  'battery safety',
  'battery materials',
  'battery testing',
  'battery optimization',
  'battery life',
  'battery capacity',
  'battery charging',
  'battery discharge',
  'battery degradation',
  'battery SOC',
  'battery SOH',
  'PyBaMM',
  'BEEP',
  'LIONSIMBA',
  'battery analytics',
  'battery machine learning',
  'battery control',
  'battery algorithm',
  'lithium cell',
  'electrode design',
  'electrolyte',
  'thermal runaway',
  'battery protection',
  'battery monitoring',
  'battery characterization',
  'battery analysis',
  'battery production',
  'battery assembly',
  'battery cooling',
  'thermal management',
]

// 分类映射
const CATEGORY_MAPPING = {
  'cell_design': ['battery cell design', 'lithium cell', 'electrode design', 'cell modeling'],
  'life_prediction': ['battery life prediction', 'battery degradation', 'SOH prediction', 'battery aging'],
  'bms': ['battery management system', 'BMS', 'battery monitoring', 'battery control'],
  'simulation': ['battery simulation', 'battery modeling', 'electrochemical model', 'PyBaMM', 'LIONSIMBA'],
  'thermal': ['battery thermal', 'thermal management', 'battery cooling', 'thermal runaway'],
  'safety': ['battery safety', 'thermal runaway', 'battery protection', 'safety monitoring'],
  'materials': ['battery materials', 'electrode materials', 'electrolyte', 'cathode', 'anode'],
  'manufacturing': ['battery manufacturing', 'battery production', 'battery assembly', 'manufacturing process'],
  'testing': ['battery testing', 'battery characterization', 'battery analysis', 'battery measurement'],
  'data_analysis': ['battery data analysis', 'battery analytics', 'battery machine learning', 'BEEP'],
  'modeling': ['battery modeling', 'electrochemical modeling', 'battery simulation', 'mathematical model'],
  'optimization': ['battery optimization', 'battery control', 'battery algorithm', 'optimization algorithm'],
}

// 根据关键词和主题确定分类
function categorizeRepository(repo) {
  const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase()
  
  for (const [category, keywords] of Object.entries(CATEGORY_MAPPING)) {
    if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
      return category
    }
  }
  
  return 'other'
}

// 计算相关性得分
function calculateRelevanceScore(repo) {
  let score = 0
  const text = `${repo.name} ${repo.description || ''} ${repo.topics.join(' ')}`.toLowerCase()
  
  // 基础分数：星标数
  score += Math.min(repo.stargazers_count / 10, 50)
  
  // 关键词匹配加分
  for (const keyword of BATTERY_KEYWORDS) {
    if (text.includes(keyword.toLowerCase())) {
      score += 5
    }
  }
  
  // 最近更新加分
  const lastUpdate = new Date(repo.updated_at)
  const now = new Date()
  const daysSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60 * 24)
  if (daysSinceUpdate < 30) score += 10
  else if (daysSinceUpdate < 90) score += 5
  
  // 有许可证加分
  if (repo.license) score += 5
  
  // 有主页加分
  if (repo.homepage) score += 3
  
  // 主题标签加分
  score += Math.min(repo.topics.length * 2, 10)
  
  return Math.min(score, 100)
}

// 搜索电池相关仓库
async function searchBatteryRepositories(query, page = 1, perPage = 100) {
  try {
    console.log(`🔍 Searching for: ${query} (page ${page})`)
    
    const response = await octokit.rest.search.repos({
      q: `${query} fork:false archived:false`,
      sort: 'stars',
      order: 'desc',
      page,
      per_page: perPage,
    })
    
    console.log(`📊 Found ${response.data.total_count} repositories, fetched ${response.data.items.length}`)
    return response.data
  } catch (error) {
    console.error('❌ GitHub API Error:', error.message)
    if (error.status === 403) {
      console.log('⏰ Rate limit exceeded, waiting...')
      await new Promise(resolve => setTimeout(resolve, 60000)) // 等待1分钟
      return searchBatteryRepositories(query, page, perPage)
    }
    throw error
  }
}

// 保存仓库到数据库
async function saveRepository(repo) {
  try {
    const category = categorizeRepository(repo)
    const relevanceScore = calculateRelevanceScore(repo)
    
    const repositoryData = {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      ssh_url: repo.ssh_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      size: repo.size,
      license: repo.license ? {
        key: repo.license.key,
        name: repo.license.name,
        spdx_id: repo.license.spdx_id,
        url: repo.license.url,
      } : null,
      owner: repo.owner ? {
        login: repo.owner.login,
        id: repo.owner.id,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
        type: repo.owner.type,
      } : null,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      archived: repo.archived,
      disabled: repo.disabled,
      visibility: repo.visibility,
      default_branch: repo.default_branch,
      category,
      relevance_score: relevanceScore,
      last_synced: new Date().toISOString(),
    }
    
    const existingRepo = await Repository.findOne({ id: repo.id })
    if (existingRepo) {
      await Repository.findOneAndUpdate({ id: repo.id }, repositoryData)
      console.log(`✅ Updated: ${repo.full_name}`)
    } else {
      await Repository.create(repositoryData)
      console.log(`🆕 Created: ${repo.full_name}`)
    }
  } catch (error) {
    console.error(`❌ Error saving ${repo.full_name}:`, error.message)
  }
}

// 主同步函数
async function syncGitHubData() {
  console.log('🚀 Starting GitHub data sync...')
  
  await connectToDatabase()
  
  const searchQueries = [
    'lithium-ion battery',
    'battery management system',
    'battery modeling',
    'battery simulation',
    'electrochemistry battery',
    'battery data analysis',
    'battery prediction',
    'battery thermal management',
    'battery safety',
    'battery materials',
    'battery testing',
    'battery optimization',
    'PyBaMM',
    'BEEP battery',
    'LIONSIMBA',
    'battery machine learning',
    'battery SOC SOH',
    'battery degradation',
    'battery charging',
    'BMS system',
  ]
  
  let totalProcessed = 0
  
  for (const query of searchQueries) {
    try {
      // 搜索前3页结果
      for (let page = 1; page <= 3; page++) {
        const searchResult = await searchBatteryRepositories(query, page, 100)
        
        if (searchResult.items.length === 0) {
          console.log(`📭 No more results for "${query}" on page ${page}`)
          break
        }
        
        for (const repo of searchResult.items) {
          await saveRepository(repo)
          totalProcessed++
        }
        
        // 避免API限制
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (error) {
      console.error(`❌ Error processing query "${query}":`, error.message)
      continue
    }
  }
  
  console.log(`🎉 Sync completed! Processed ${totalProcessed} repositories`)
  
  // 显示统计信息
  const stats = await Repository.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgStars: { $avg: '$stargazers_count' },
        totalStars: { $sum: '$stargazers_count' },
      }
    },
    { $sort: { count: -1 } }
  ])
  
  console.log('\n📊 Repository Statistics:')
  console.table(stats)
  
  mongoose.connection.close()
}

// 运行同步
if (require.main === module) {
  syncGitHubData().catch(error => {
    console.error('❌ Sync failed:', error)
    process.exit(1)
  })
}

module.exports = { syncGitHubData } 