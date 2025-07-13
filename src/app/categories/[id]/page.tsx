'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Battery, 
  BarChart3, 
  Cpu, 
  Settings, 
  Thermometer, 
  Shield, 
  FlaskConical,
  Wrench,
  TestTube,
  Layers,
  Target,
  ArrowLeft,
  Search,
  Filter,
  Star,
  GitFork,
  Calendar,
  ExternalLink,
  SortAsc,
  SortDesc
} from 'lucide-react'

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
  html_url: string
  license?: string
}

export default function CategoryDetailPage() {
  const params = useParams()
  const categoryId = params.id as string
  
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('stars')
  const [sortOrder, setSortOrder] = useState('desc')
  const [languageFilter, setLanguageFilter] = useState('')

  // 分类信息映射
  const categoryInfo = {
    'cell-design': {
      name: '电芯设计与建模',
      description: '电池单体设计、电极材料优化、电化学建模等核心技术',
      icon: Battery,
      color: 'from-blue-500 to-blue-600'
    },
    'life-prediction': {
      name: '电池寿命预测',
      description: '基于数据驱动和物理模型的电池寿命预测技术',
      icon: BarChart3,
      color: 'from-green-500 to-green-600'
    },
    'bms': {
      name: '电池管理系统',
      description: 'BMS硬件设计、软件算法、平衡控制等管理系统技术',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600'
    },
    'simulation': {
      name: '仿真与模拟工具',
      description: '电池性能仿真、多物理场耦合、有限元分析等仿真技术',
      icon: Settings,
      color: 'from-orange-500 to-orange-600'
    },
    'thermal': {
      name: '热管理系统',
      description: '电池热管理、散热设计、温度控制等热相关技术',
      icon: Thermometer,
      color: 'from-red-500 to-red-600'
    },
    'safety': {
      name: '安全与监控',
      description: '电池安全监测、故障诊断、风险评估等安全技术',
      icon: Shield,
      color: 'from-yellow-500 to-yellow-600'
    },
    'materials': {
      name: '材料科学研究',
      description: '电极材料、电解液、隔膜等电池材料的研究与开发',
      icon: FlaskConical,
      color: 'from-pink-500 to-pink-600'
    },
    'manufacturing': {
      name: '制造工艺优化',
      description: '电池制造过程优化、工艺控制、质量管理等制造技术',
      icon: Wrench,
      color: 'from-indigo-500 to-indigo-600'
    },
    'testing': {
      name: '测试与表征工具',
      description: '电池性能测试、电化学表征、数据采集等测试技术',
      icon: TestTube,
      color: 'from-teal-500 to-teal-600'
    },
    'data-analysis': {
      name: '数据分析与可视化',
      description: '电池数据分析、可视化展示、统计分析等数据处理技术',
      icon: BarChart3,
      color: 'from-cyan-500 to-cyan-600'
    },
    'modeling': {
      name: '数学建模工具',
      description: '电池数学模型、算法实现、数值计算等建模技术',
      icon: Layers,
      color: 'from-emerald-500 to-emerald-600'
    },
    'optimization': {
      name: '优化算法',
      description: '电池系统优化、参数调优、智能算法等优化技术',
      icon: Target,
      color: 'from-violet-500 to-violet-600'
    }
  }

  // 模拟项目数据
  const mockRepositories: Repository[] = [
    {
      id: 1,
      name: 'CellSim',
      full_name: 'cellsim/CellSim',
      description: '高性能电芯仿真引擎，支持多物理场耦合仿真，适用于电池设计优化。提供完整的电化学、热力学和力学耦合模型。',
      language: 'Julia',
      stars: 1234,
      forks: 187,
      updated_at: '2024-01-12T16:45:00Z',
      topics: ['simulation', 'multiphysics', 'julia', 'battery-design', 'electrochemistry'],
      html_url: 'https://github.com/cellsim/CellSim',
      license: 'MIT'
    },
    {
      id: 2,
      name: 'ElectrodeDesign',
      full_name: 'battery-design/ElectrodeDesign',
      description: '电极材料设计工具，基于机器学习优化电极结构和材料配比，提高电池性能和循环寿命。',
      language: 'Python',
      stars: 890,
      forks: 123,
      updated_at: '2024-01-18T09:30:00Z',
      topics: ['electrode-design', 'machine-learning', 'materials', 'optimization'],
      html_url: 'https://github.com/battery-design/ElectrodeDesign',
      license: 'Apache-2.0'
    },
    {
      id: 3,
      name: 'BatteryCAD',
      full_name: 'open-battery/BatteryCAD',
      description: '开源电池结构设计软件，支持3D建模、结构优化和热仿真分析，适用于电池包设计。',
      language: 'C++',
      stars: 567,
      forks: 89,
      updated_at: '2024-01-20T14:15:00Z',
      topics: ['cad', 'battery-design', '3d-modeling', 'thermal-analysis'],
      html_url: 'https://github.com/open-battery/BatteryCAD',
      license: 'GPL-3.0'
    },
    {
      id: 4,
      name: 'CellOptimizer',
      full_name: 'battery-opt/CellOptimizer',
      description: '电芯参数优化工具，使用遗传算法和粒子群优化算法，自动优化电池设计参数。',
      language: 'MATLAB',
      stars: 432,
      forks: 67,
      updated_at: '2024-01-15T11:20:00Z',
      topics: ['optimization', 'genetic-algorithm', 'cell-design', 'matlab'],
      html_url: 'https://github.com/battery-opt/CellOptimizer',
      license: 'MIT'
    },
    {
      id: 5,
      name: 'NanoStructure',
      full_name: 'nano-battery/NanoStructure',
      description: '纳米结构电池材料建模工具，支持分子动力学仿真和量子化学计算，研究材料微观结构。',
      language: 'Python',
      stars: 321,
      forks: 45,
      updated_at: '2024-01-10T08:45:00Z',
      topics: ['nanostructure', 'molecular-dynamics', 'quantum-chemistry', 'materials'],
      html_url: 'https://github.com/nano-battery/NanoStructure',
      license: 'BSD-3-Clause'
    },
    {
      id: 6,
      name: 'BatteryFEM',
      full_name: 'fem-battery/BatteryFEM',
      description: '基于有限元方法的电池仿真工具，支持电化学-热-力耦合分析，适用于电池安全性评估。',
      language: 'C++',
      stars: 654,
      forks: 98,
      updated_at: '2024-01-22T16:30:00Z',
      topics: ['finite-element', 'multiphysics', 'safety-analysis', 'cpp'],
      html_url: 'https://github.com/fem-battery/BatteryFEM',
      license: 'Apache-2.0'
    }
  ]

  const currentCategory = categoryInfo[categoryId as keyof typeof categoryInfo]
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            分类不存在
          </h1>
          <Link
            href="/categories"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            返回分类列表
          </Link>
        </div>
      </div>
    )
  }

  const Icon = currentCategory.icon

  // 过滤和排序逻辑
  const filteredRepositories = mockRepositories
    .filter(repo => {
      const matchesSearch = !searchQuery || 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesLanguage = !languageFilter || repo.language === languageFilter
      
      return matchesSearch && matchesLanguage
    })
    .sort((a, b) => {
      const order = sortOrder === 'desc' ? -1 : 1
      if (sortBy === 'stars') {
        return (a.stars - b.stars) * order
      } else if (sortBy === 'forks') {
        return (a.forks - b.forks) * order
      } else if (sortBy === 'updated') {
        return (new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()) * order
      }
      return 0
    })

  const languages = Array.from(new Set(mockRepositories.map(repo => repo.language)))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
            href="/categories"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回分类列表
          </Link>
        </motion.div>

        {/* 分类头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${currentCategory.color} rounded-2xl flex items-center justify-center mr-6`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentCategory.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {currentCategory.description}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {filteredRepositories.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">个项目</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {filteredRepositories.reduce((sum, repo) => sum + repo.stars, 0).toLocaleString()}
                </div>
                <div className="text-gray-600 dark:text-gray-400">总星标数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {languages.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">种编程语言</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 搜索和筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap gap-4 items-center">
              {/* 搜索框 */}
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索项目..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* 语言筛选 */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">所有语言</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* 排序 */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">排序:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="stars">星标数</option>
                  <option value="forks">Fork数</option>
                  <option value="updated">更新时间</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 项目列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepositories.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {repo.full_name}
                  </p>
                  {repo.license && (
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                      {repo.license}
                    </span>
                  )}
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

        {/* 空状态 */}
        {filteredRepositories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg">没有找到匹配的项目</p>
              <p className="text-sm">尝试调整搜索关键词或筛选条件</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 