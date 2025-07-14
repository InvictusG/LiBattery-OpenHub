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
  SortDesc,
  Package,
  Tag,
  Book
} from 'lucide-react'
import { Repository } from '@/types'
import { mockCategories, mockRepositories } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { ProjectCard } from '@/components/ui/ProjectCard';

export async function generateStaticParams() {
  const categories = mockCategories;
  return categories.map((category) => ({
    id: category.id,
  }));
}

export default function CategoryDetailPage() {
  const params = useParams()
  const categoryId = params.id as string
  
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('stars')
  const [sortOrder, setSortOrder] = useState('desc')

  // This should be derived from your global categories definition
  const categoryInfo = {
    'BMS': { name: '电池管理系统', description: 'BMS硬件设计、软件算法、平衡控制等管理系统技术', icon: Cpu, color: 'from-purple-500 to-purple-600' },
    'CELL_DESIGN': { name: '电芯设计与建模', description: '电池单体设计、电极材料优化、电化学建模等核心技术', icon: Battery, color: 'from-blue-500 to-blue-600' },
    'MATERIALS': { name: '材料科学研究', description: '电极材料、电解液、隔膜等电池材料的研究与开发', icon: FlaskConical, color: 'from-pink-500 to-pink-600' },
    'RECYCLING': { name: '回收与可持续', description: '电池回收技术和可持续生命周期管理', icon: Wrench, color: 'from-green-500 to-green-600' },
    'TESTING': { name: '测试与分析', description: '电池性能测试、数据采集和分析工具', icon: TestTube, color: 'from-teal-500 to-teal-600' },
    'PACK_MANUFACTURING': { name: '电池包制造', description: '电池包的自动化制造和组装技术', icon: Settings, color: 'from-indigo-500 to-indigo-600' },
  }

  const category = categoryInfo[categoryId.toUpperCase() as keyof typeof categoryInfo]
  
  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">分类不存在</h1>
          <p className="mt-2 text-muted-foreground">无法找到您请求的分类。</p>
          <Button asChild className="mt-6">
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回分类列表
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const Icon = category.icon

  // Filtering and sorting logic
  const categoryProjects = mockRepositories
    .filter(repo => {
      if (repo.category.toUpperCase() !== categoryId.toUpperCase()) return false;
      const matchesSearch = !searchQuery || 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesSearch
    })
    .sort((a, b) => {
      const order = sortOrder === 'desc' ? -1 : 1
      if (sortBy === 'stars') {
        return (a.stars - b.stars) * order
      } else if (sortBy === 'forks') {
        return (a.forks - b.forks) * order
      } else if (sortBy === 'updated') {
        return (new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime()) * order
      }
      return 0
    })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-12">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <Button variant="ghost" asChild>
          <Link href="/categories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回分类列表
          </Link>
        </Button>
      </motion.div>

      {/* Category Header */}
      <header className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
            <Book className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{category.name}</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">{category.description}</p>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-xl border border-border/40 bg-background/80 p-4"
      >
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="在当前分类下搜索..."
              className="w-full pl-10"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">排序:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">星标数</SelectItem>
                <SelectItem value="forks">Fork数</SelectItem>
                <SelectItem value="updated">更新时间</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
              {sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Repositories List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryProjects.map((repo, index) => (
          <ProjectCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </div>
  )
} 