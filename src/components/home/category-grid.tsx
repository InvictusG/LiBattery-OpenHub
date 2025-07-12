'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Battery, 
  Zap, 
  Shield, 
  Thermometer, 
  Cpu, 
  Wrench, 
  FlaskConical,
  BarChart3,
  Settings,
  TestTube,
  Target,
  Layers
} from 'lucide-react'
import { BatteryCategory, CategoryLabels } from '@/types'

export function CategoryGrid() {
  const categories = [
    {
      key: BatteryCategory.CELL_DESIGN,
      icon: Battery,
      color: 'from-blue-500 to-blue-600',
      count: 156,
    },
    {
      key: BatteryCategory.LIFE_PREDICTION,
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      count: 89,
    },
    {
      key: BatteryCategory.BMS,
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      count: 134,
    },
    {
      key: BatteryCategory.SIMULATION,
      icon: Settings,
      color: 'from-orange-500 to-orange-600',
      count: 98,
    },
    {
      key: BatteryCategory.THERMAL,
      icon: Thermometer,
      color: 'from-red-500 to-red-600',
      count: 67,
    },
    {
      key: BatteryCategory.SAFETY,
      icon: Shield,
      color: 'from-yellow-500 to-yellow-600',
      count: 78,
    },
    {
      key: BatteryCategory.MATERIALS,
      icon: FlaskConical,
      color: 'from-pink-500 to-pink-600',
      count: 123,
    },
    {
      key: BatteryCategory.MANUFACTURING,
      icon: Wrench,
      color: 'from-indigo-500 to-indigo-600',
      count: 45,
    },
    {
      key: BatteryCategory.TESTING,
      icon: TestTube,
      color: 'from-teal-500 to-teal-600',
      count: 87,
    },
    {
      key: BatteryCategory.DATA_ANALYSIS,
      icon: BarChart3,
      color: 'from-cyan-500 to-cyan-600',
      count: 92,
    },
    {
      key: BatteryCategory.MODELING,
      icon: Layers,
      color: 'from-emerald-500 to-emerald-600',
      count: 73,
    },
    {
      key: BatteryCategory.OPTIMIZATION,
      icon: Target,
      color: 'from-violet-500 to-violet-600',
      count: 56,
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            技术分类
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            按照电池技术领域分类浏览，快速找到您感兴趣的开源项目
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/categories/${category.key}`}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-100 dark:border-gray-700 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {CategoryLabels[category.key]}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {category.count} 个项目
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                    <span>查看更多</span>
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 