'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Star, 
  GitFork, 
  Calendar, 
  ExternalLink,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus,
  Flame,
  Award,
  Clock
} from 'lucide-react'

interface TrendingRepository {
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
  trending_score: number
  star_growth: number
  fork_growth: number
  growth_trend: 'up' | 'down' | 'stable'
}

export default function TrendingPage() {
  const [timeRange, setTimeRange] = useState('week')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [languageFilter, setLanguageFilter] = useState('')

  // 模拟热门项目数据
  const trendingRepositories: TrendingRepository[] = [
    {
      id: 1,
      name: 'BatteryML',
      full_name: 'battery-intelligence/BatteryML',
      description: '基于机器学习的电池状态估计和寿命预测工具包，包含多种先进的算法实现，支持深度学习和传统机器学习方法。',
      language: 'Python',
      stars: 2340,
      forks: 456,
      updated_at: '2024-01-20T14:15:00Z',
      topics: ['machine-learning', 'battery-soh', 'prediction', 'deep-learning', 'tensorflow'],
      category: '寿命预测',
      html_url: 'https://github.com/battery-intelligence/BatteryML',
      license: 'MIT',
      trending_score: 95,
      star_growth: 234,
      fork_growth: 45,
      growth_trend: 'up'
    },
    {
      id: 2,
      name: 'OpenBMS',
      full_name: 'openbms/OpenBMS',
      description: '开源电池管理系统硬件和软件解决方案，支持多种电池化学类型，提供完整的BMS设计参考。',
      language: 'C++',
      stars: 1890,
      forks: 234,
      updated_at: '2024-01-18T11:30:00Z',
      topics: ['bms', 'battery-management', 'embedded', 'hardware', 'can-bus'],
      category: 'BMS系统',
      html_url: 'https://github.com/openbms/OpenBMS',
      license: 'Apache-2.0',
      trending_score: 88,
      star_growth: 189,
      fork_growth: 23,
      growth_trend: 'up'
    },
    {
      id: 3,
      name: 'CellSim',
      full_name: 'cellsim/CellSim',
      description: '高性能电芯仿真引擎，支持多物理场耦合仿真，适用于电池设计优化和性能预测。',
      language: 'Julia',
      stars: 1234,
      forks: 187,
      updated_at: '2024-01-12T16:45:00Z',
      topics: ['simulation', 'multiphysics', 'julia', 'battery-design', 'electrochemistry'],
      category: '电芯设计',
      html_url: 'https://github.com/cellsim/CellSim',
      license: 'MIT',
      trending_score: 82,
      star_growth: 123,
      fork_growth: 18,
      growth_trend: 'up'
    },
    {
      id: 4,
      name: 'BatteryDataHub',
      full_name: 'data-hub/BatteryDataHub',
      description: '电池测试数据集和分析工具集合，包含多种电池类型的充放电数据和分析脚本。',
      language: 'R',
      stars: 987,
      forks: 145,
      updated_at: '2024-01-14T09:20:00Z',
      topics: ['dataset', 'battery-data', 'analysis', 'r-package', 'visualization'],
      category: '数据分析',
      html_url: 'https://github.com/data-hub/BatteryDataHub',
      license: 'CC-BY-4.0',
      trending_score: 79,
      star_growth: 98,
      fork_growth: 14,
      growth_trend: 'up'
    },
    {
      id: 5,
      name: 'ThermalBMS',
      full_name: 'thermal/ThermalBMS',
      description: '专注于热管理的电池管理系统，集成温度监控、散热控制和热建模功能。',
      language: 'Python',
      stars: 756,
      forks: 98,
      updated_at: '2024-01-16T13:45:00Z',
      topics: ['thermal-management', 'temperature-control', 'bms', 'heat-dissipation'],
      category: '热管理',
      html_url: 'https://github.com/thermal/ThermalBMS',
      license: 'MIT',
      trending_score: 75,
      star_growth: 75,
      fork_growth: 9,
      growth_trend: 'up'
    },
    {
      id: 6,
      name: 'SafetyMonitor',
      full_name: 'safety/SafetyMonitor',
      description: '电池安全监控系统，实时检测电池状态异常，预防热失控和其他安全风险。',
      language: 'C++',
      stars: 654,
      forks: 87,
      updated_at: '2024-01-19T10:15:00Z',
      topics: ['safety', 'monitoring', 'thermal-runaway', 'fault-detection'],
      category: '安全监控',
      html_url: 'https://github.com/safety/SafetyMonitor',
      license: 'GPL-3.0',
      trending_score: 72,
      star_growth: 65,
      fork_growth: 8,
      growth_trend: 'stable'
    },
    {
      id: 7,
      name: 'MaterialDB',
      full_name: 'materials/MaterialDB',
      description: '电池材料数据库，收录了各种电极材料、电解液和隔膜的性能参数和特性数据。',
      language: 'JavaScript',
      stars: 543,
      forks: 76,
      updated_at: '2024-01-21T15:30:00Z',
      topics: ['materials', 'database', 'electrodes', 'electrolyte', 'separator'],
      category: '材料科学',
      html_url: 'https://github.com/materials/MaterialDB',
      license: 'MIT',
      trending_score: 68,
      star_growth: 54,
      fork_growth: 7,
      growth_trend: 'up'
    },
    {
      id: 8,
      name: 'BatteryViz',
      full_name: 'visualization/BatteryViz',
      description: '电池数据可视化工具，提供丰富的图表和仪表板，帮助分析电池性能和健康状态。',
      language: 'TypeScript',
      stars: 432,
      forks: 65,
      updated_at: '2024-01-17T12:00:00Z',
      topics: ['visualization', 'dashboard', 'charts', 'battery-analysis', 'react'],
      category: '数据分析',
      html_url: 'https://github.com/visualization/BatteryViz',
      license: 'MIT',
      trending_score: 65,
      star_growth: 43,
      fork_growth: 6,
      growth_trend: 'up'
    }
  ]

  const categories = [
    '寿命预测', 'BMS系统', '电芯设计', '数据分析', '热管理',
    '安全监控', '材料科学', '仿真建模', '测试工具', '优化算法'
  ]

  const languages = ['Python', 'C++', 'Julia', 'R', 'JavaScript', 'TypeScript', 'MATLAB']

  const timeRanges = [
    { value: 'day', label: '今日' },
    { value: 'week', label: '本周' },
    { value: 'month', label: '本月' },
    { value: 'year', label: '今年' }
  ]

  // 过滤逻辑
  const filteredRepositories = trendingRepositories.filter(repo => {
    const matchesCategory = !categoryFilter || repo.category === categoryFilter
    const matchesLanguage = !languageFilter || repo.language === languageFilter
    return matchesCategory && matchesLanguage
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400'
      case 'down':
        return 'text-red-600 dark:text-red-400'
      case 'stable':
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Flame className="h-8 w-8 text-orange-500 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              热门项目
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            发现最受关注的锂离子电池开源项目，跟踪技术趋势和社区热点
          </p>
        </motion.div>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">热门项目</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredRepositories.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">新增星标</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredRepositories.reduce((sum, repo) => sum + repo.star_growth, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <GitFork className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">新增Fork</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredRepositories.reduce((sum, repo) => sum + repo.fork_growth, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">平均热度</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(filteredRepositories.reduce((sum, repo) => sum + repo.trending_score, 0) / filteredRepositories.length)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 筛选器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex flex-wrap gap-4 items-center">
            {/* 时间范围 */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">时间:</span>
              <div className="flex space-x-1">
                {timeRanges.map(range => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      timeRange === range.value
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 分类筛选 */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">分类:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="">全部分类</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* 语言筛选 */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">语言:</span>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="">全部语言</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* 热门项目列表 */}
        <div className="space-y-6">
          {filteredRepositories.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl font-bold text-orange-500 mr-4">
                      #{index + 1}
                    </span>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {repo.name}
                      </h3>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                        {repo.category}
                      </span>
                      {repo.license && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          {repo.license}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {repo.full_name}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {repo.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars.toLocaleString()}</span>
                      <span className={`flex items-center space-x-1 ${getTrendColor(repo.growth_trend)}`}>
                        {getTrendIcon(repo.growth_trend)}
                        <span>+{repo.star_growth}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks.toLocaleString()}</span>
                      <span className={`flex items-center space-x-1 ${getTrendColor(repo.growth_trend)}`}>
                        {getTrendIcon(repo.growth_trend)}
                        <span>+{repo.fork_growth}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(repo.updated_at)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-orange-500 font-medium">{repo.trending_score}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                        +{repo.topics.length - 4}
                      </span>
                    )}
                  </div>
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
            </motion.div>
          ))}
        </div>

        {/* 底部行动号召 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              发现更多优秀项目
            </h2>
            <p className="text-lg mb-6 opacity-90">
              探索更多锂离子电池技术的开源项目，参与社区建设
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/search"
                className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                搜索项目
              </Link>
              <Link
                href="/categories"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                浏览分类
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 