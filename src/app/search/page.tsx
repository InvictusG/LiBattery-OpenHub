'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, SortAsc, SortDesc, Grid, List, Star, GitFork, Calendar, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  language: string
  stars: number
  forks: number
  updated_at: string
  topics: string[]
  category: string
  html_url: string
  license?: string
  archived: boolean
}

interface SearchFilters {
  category: string
  language: string
  minStars: string
  maxStars: string
  hasLicense: string
  sortBy: string
  sortOrder: string
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    language: '',
    minStars: '',
    maxStars: '',
    hasLicense: '',
    sortBy: 'stars',
    sortOrder: 'desc'
  })
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false
  })

  // 模拟数据
  const mockRepositories: Repository[] = [
    {
      id: 1,
      name: 'PyBaMM',
      full_name: 'pybamm-team/PyBaMM',
      description: 'Python Battery Mathematical Modeling (PyBaMM) 是一个开源的电池建模包，提供了快速、灵活且准确的电池模拟工具。',
      language: 'Python',
      stars: 1200,
      forks: 340,
      updated_at: '2024-01-15T10:30:00Z',
      topics: ['battery-modeling', 'simulation', 'python', 'electrochemistry'],
      category: '模拟工具',
      html_url: 'https://github.com/pybamm-team/PyBaMM',
      license: 'MIT',
      archived: false
    },
    {
      id: 2,
      name: 'BEEP',
      full_name: 'TRI-AMDD/beep',
      description: 'Battery Evaluation and Early Prediction (BEEP) 是一个用于电池数据分析和早期预测的开源平台。',
      language: 'Python',
      stars: 890,
      forks: 156,
      updated_at: '2024-01-10T15:45:00Z',
      topics: ['battery-data', 'machine-learning', 'prediction', 'analysis'],
      category: '数据分析',
      html_url: 'https://github.com/TRI-AMDD/beep',
      license: 'Apache-2.0',
      archived: false
    },
    {
      id: 3,
      name: 'LIONSIMBA',
      full_name: 'lionsimbatoolbox/LIONSIMBA',
      description: 'LIONSIMBA 是一个基于 MATLAB 的锂离子电池仿真工具箱，支持多种电池模型和仿真场景。',
      language: 'MATLAB',
      stars: 456,
      forks: 123,
      updated_at: '2024-01-08T09:20:00Z',
      topics: ['matlab', 'battery-simulation', 'lithium-ion', 'modeling'],
      category: '仿真建模',
      html_url: 'https://github.com/lionsimbatoolbox/LIONSIMBA',
      license: 'GPL-3.0',
      archived: false
    },
    {
      id: 4,
      name: 'BatteryML',
      full_name: 'battery-intelligence/BatteryML',
      description: '基于机器学习的电池状态估计和寿命预测工具包，包含多种先进的算法实现。',
      language: 'Python',
      stars: 2340,
      forks: 456,
      updated_at: '2024-01-20T14:15:00Z',
      topics: ['machine-learning', 'battery-soh', 'prediction', 'deep-learning'],
      category: '寿命预测',
      html_url: 'https://github.com/battery-intelligence/BatteryML',
      license: 'MIT',
      archived: false
    },
    {
      id: 5,
      name: 'OpenBMS',
      full_name: 'openbms/OpenBMS',
      description: '开源电池管理系统硬件和软件解决方案，支持多种电池化学类型。',
      language: 'C++',
      stars: 1890,
      forks: 234,
      updated_at: '2024-01-18T11:30:00Z',
      topics: ['bms', 'battery-management', 'embedded', 'hardware'],
      category: 'BMS系统',
      html_url: 'https://github.com/openbms/OpenBMS',
      license: 'Apache-2.0',
      archived: false
    },
    {
      id: 6,
      name: 'CellSim',
      full_name: 'cellsim/CellSim',
      description: '高性能电芯仿真引擎，支持多物理场耦合仿真，适用于电池设计优化。',
      language: 'Julia',
      stars: 1234,
      forks: 187,
      updated_at: '2024-01-12T16:45:00Z',
      topics: ['simulation', 'multiphysics', 'julia', 'battery-design'],
      category: '电芯设计',
      html_url: 'https://github.com/cellsim/CellSim',
      license: 'MIT',
      archived: false
    }
  ]

  // 搜索功能
  const performSearch = async () => {
    setLoading(true)
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 简单的搜索过滤逻辑
    let filteredRepos = mockRepositories
    
    if (query) {
      filteredRepos = filteredRepos.filter(repo => 
        repo.name.toLowerCase().includes(query.toLowerCase()) ||
        repo.description.toLowerCase().includes(query.toLowerCase()) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase()))
      )
    }
    
    if (filters.category) {
      filteredRepos = filteredRepos.filter(repo => repo.category === filters.category)
    }
    
    if (filters.language) {
      filteredRepos = filteredRepos.filter(repo => repo.language === filters.language)
    }
    
    if (filters.minStars) {
      filteredRepos = filteredRepos.filter(repo => repo.stars >= parseInt(filters.minStars))
    }
    
    if (filters.maxStars) {
      filteredRepos = filteredRepos.filter(repo => repo.stars <= parseInt(filters.maxStars))
    }
    
    if (filters.hasLicense === 'true') {
      filteredRepos = filteredRepos.filter(repo => repo.license)
    } else if (filters.hasLicense === 'false') {
      filteredRepos = filteredRepos.filter(repo => !repo.license)
    }
    
    // 排序
    filteredRepos.sort((a, b) => {
      const order = filters.sortOrder === 'desc' ? -1 : 1
      if (filters.sortBy === 'stars') {
        return (a.stars - b.stars) * order
      } else if (filters.sortBy === 'forks') {
        return (a.forks - b.forks) * order
      } else if (filters.sortBy === 'updated') {
        return (new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()) * order
      }
      return 0
    })
    
    setRepositories(filteredRepos)
    setPagination({
      page: 1,
      totalPages: Math.ceil(filteredRepos.length / 20),
      total: filteredRepos.length,
      hasNext: filteredRepos.length > 20,
      hasPrev: false
    })
    setLoading(false)
  }

  useEffect(() => {
    performSearch()
  }, [query, filters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const categories = [
    '电芯设计', '寿命预测', 'BMS系统', '模拟工具', '热管理',
    '安全监控', '材料科学', '制造工艺', '测试工具', '数据分析',
    '数学建模', '优化算法'
  ]

  const languages = ['Python', 'MATLAB', 'C++', 'Julia', 'R', 'JavaScript', 'Java']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 搜索头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            搜索开源项目
          </h1>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索电池技术、BMS系统、寿命预测..."
                className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white"
              />
            </div>
          </form>

          {/* 工具栏 */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>筛选</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">排序:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="stars">星标数</option>
                  <option value="forks">Fork数</option>
                  <option value="updated">更新时间</option>
                </select>
                <button
                  onClick={() => setFilters({...filters, sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc'})}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  {filters.sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 筛选面板 */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">分类</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="">全部分类</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">编程语言</label>
                <select
                  value={filters.language}
                  onChange={(e) => setFilters({...filters, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="">全部语言</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">最小星标数</label>
                <input
                  type="number"
                  value={filters.minStars}
                  onChange={(e) => setFilters({...filters, minStars: e.target.value})}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">许可证</label>
                <select
                  value={filters.hasLicense}
                  onChange={(e) => setFilters({...filters, hasLicense: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="">不限</option>
                  <option value="true">有许可证</option>
                  <option value="false">无许可证</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* 搜索结果 */}
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            找到 {pagination.total} 个结果
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {repositories.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 ${
                  viewMode === 'list' ? 'p-4' : 'p-6'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {repo.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {repo.full_name}
                    </p>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                      {repo.category}
                    </span>
                  </div>
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {repo.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 分页 */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button
                disabled={!pagination.hasPrev}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                上一页
              </button>
              <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
                第 {pagination.page} 页，共 {pagination.totalPages} 页
              </span>
              <button
                disabled={!pagination.hasNext}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
} 