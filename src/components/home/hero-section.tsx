'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowRight, Battery, Zap, Shield, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const features = [
    {
      icon: Battery,
      title: '电芯技术',
      description: '最新的锂离子电池设计和制造技术',
    },
    {
      icon: Zap,
      title: '性能优化',
      description: '充放电性能、循环寿命预测工具',
    },
    {
      icon: Shield,
      title: '安全管理',
      description: 'BMS系统、热管理和安全监控',
    },
    {
      icon: Cpu,
      title: '智能算法',
      description: '机器学习、数据分析和仿真模拟',
    },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse-slow" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              锂离子电池
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                开源资源中心
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              汇聚全球最新的锂离子电池开源项目、研究工具和技术资源，为电池工程师和研究人员提供一站式解决方案
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索电池技术、BMS系统、寿命预测..."
                  className="w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:border-gray-600 dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors flex items-center space-x-2"
                >
                  <span>搜索</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/trending"
              className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:scale-105"
            >
              <span className="text-gray-700 dark:text-gray-300">🔥 热门项目</span>
            </Link>
            <Link
              href="/categories"
              className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:scale-105"
            >
              <span className="text-gray-700 dark:text-gray-300">📚 分类浏览</span>
            </Link>
            <Link
              href="/contribute"
              className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:scale-105"
            >
              <span className="text-gray-700 dark:text-gray-300">➕ 贡献项目</span>
            </Link>
          </motion.div>
        </div>

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="text-center p-6 bg-white/60 backdrop-blur-sm dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 