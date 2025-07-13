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
  Package
} from 'lucide-react'
import { Repository } from '@/types'
import { mockRepositories } from '@/lib/mock-data'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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

  const currentCategory = categoryInfo[categoryId.toUpperCase() as keyof typeof categoryInfo]
  
  if (!currentCategory) {
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

  const Icon = currentCategory.icon

  // Filtering and sorting logic
  const filteredRepositories = mockRepositories
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
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/80 p-8"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${currentCategory.color} flex-shrink-0`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {currentCategory.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {currentCategory.description}
            </p>
          </div>
        </div>
      </motion.header>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepositories.length > 0 ? (
          filteredRepositories.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="flex flex-col h-full bg-background/80 backdrop-blur-sm border-border/40 hover:border-border/80 hover:bg-background/90 transition-all duration-300 group">
                 <CardHeader className="flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        <Link href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          {repo.name}
                        </Link>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{repo.owner}</p>
                    </div>
                    <Link href={repo.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 h-[60px]">{repo.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-4 w-4" />
                        <span>{repo.forks.toLocaleString()}</span>
                      </div>
                       <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(repo.lastUpdate)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <Badge key={topic} variant="outline" className="font-normal">
                        {topic}
                      </Badge>
                    ))}
                  </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold text-foreground">没有找到匹配的项目</h3>
            <p className="mt-1 text-muted-foreground">尝试调整您的搜索词。</p>
          </div>
        )}
      </div>
    </div>
  )
} 