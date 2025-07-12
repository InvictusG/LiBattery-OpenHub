'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Database, GitBranch, Users, TrendingUp } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      icon: Database,
      label: '开源项目',
      value: '1,200+',
      description: '涵盖电池技术各个领域',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: GitBranch,
      label: '总星标数',
      value: '50K+',
      description: '社区认可度指标',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Users,
      label: '活跃开发者',
      value: '5,000+',
      description: '全球电池技术专家',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: TrendingUp,
      label: '月度更新',
      value: '300+',
      description: '项目持续活跃',
      color: 'from-orange-500 to-orange-600',
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
            平台数据概览
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            汇聚全球锂离子电池开源生态系统的核心数据
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 