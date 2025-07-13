'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowRight, Battery, Zap, Shield, Cpu } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

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
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-background"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50 dark:from-background dark:via-background/80 dark:to-background/20 z-0" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Animated blobs */}
      <div className="absolute -left-20 -top-20 h-[30rem] w-[30rem] rounded-full bg-purple-400/20 blur-[100px] dark:bg-purple-700/20" />
      <div className="absolute -right-20 -bottom-20 h-[30rem] w-[30rem] rounded-full bg-blue-400/20 blur-[100px] dark:bg-blue-700/20" />
      
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col items-center justify-center space-y-12 text-center"
        >
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl text-foreground">
              锂离子电池
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
                开源资源中心
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              汇聚全球最新的锂离子电池开源项目、研究工具和技术资源，为电池工程师和研究人员提供一站式解决方案
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索电池技术、BMS系统、寿命预测..."
                  className="pr-24 pl-10 py-6 h-14 text-base rounded-full border-border/40 bg-background/80 backdrop-blur-sm shadow-lg"
                />
                <Search className="absolute left-3.5 text-muted-foreground h-5 w-5" />
                <Button 
                  type="submit"
                  className="absolute right-1.5 rounded-full h-11"
                >
                  <span>搜索</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link href="/trending">
              <Button variant="outline" className="rounded-full h-11 px-6 border-border/40 bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:border-border">
                🔥 热门项目
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" className="rounded-full h-11 px-6 border-border/40 bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:border-border">
                📚 分类浏览
              </Button>
            </Link>
            <Link href="/contribute">
              <Button variant="outline" className="rounded-full h-11 px-6 border-border/40 bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:border-border">
                ➕ 贡献项目
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <FeatureCard
                key={feature.title}
                icon={<Icon className="h-5 w-5" />}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index + 0.6 }}
    >
      <Card className="relative overflow-hidden border-border/40 bg-background/80 backdrop-blur-sm hover:bg-background/90 hover:border-border transition-all duration-300 h-full">
        <div className="p-6">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              {icon}
            </div>
          </div>
          <h3 className="mb-2 text-xl font-medium text-foreground">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Card>
    </motion.div>
  )
} 