'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Star, GitFork, ExternalLink } from 'lucide-react'

export function TrendingProjects() {
  // 模拟数据 - 实际应用中从API获取
  const trendingProjects = [
    {
      id: 1,
      name: 'BatteryML',
      full_name: 'battery-intelligence/BatteryML',
      description: '基于机器学习的电池状态估计和寿命预测工具包',
      language: 'Python',
      stars: 2340,
      forks: 456,
      trending_score: 95,
      html_url: 'https://github.com/battery-intelligence/BatteryML',
    },
    {
      id: 2,
      name: 'OpenBMS',
      full_name: 'openbms/OpenBMS',
      description: '开源电池管理系统硬件和软件解决方案',
      language: 'C++',
      stars: 1890,
      forks: 234,
      trending_score: 88,
      html_url: 'https://github.com/openbms/OpenBMS',
    },
    {
      id: 3,
      name: 'CellSim',
      full_name: 'cellsim/CellSim',
      description: '高性能电芯仿真引擎，支持多物理场耦合',
      language: 'Julia',
      stars: 1234,
      forks: 187,
      trending_score: 82,
      html_url: 'https://github.com/cellsim/CellSim',
    },
    {
      id: 4,
      name: 'BatteryDataHub',
      full_name: 'data-hub/BatteryDataHub',
      description: '电池测试数据集和分析工具集合',
      language: 'R',
      stars: 987,
      forks: 145,
      trending_score: 79,
      html_url: 'https://github.com/data-hub/BatteryDataHub',
    },
    {
      id: 5,
      name: 'ThermalBMS',
      full_name: 'thermal/ThermalBMS',
      description: '专注于热管理的电池管理系统',
      language: 'Python',
      stars: 756,
      forks: 98,
      trending_score: 75,
      html_url: 'https://github.com/thermal/ThermalBMS',
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-orange-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              本周热门
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            社区最受关注的锂离子电池开源项目
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {trendingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-6 last:mb-0"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 p-6 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-bold text-orange-500 mr-3">
                        #{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {project.full_name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {project.language}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <Star className="h-4 w-4" />
                        <span>{project.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <GitFork className="h-4 w-4" />
                        <span>{project.forks.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-orange-500">
                        <TrendingUp className="h-4 w-4" />
                        <span>{project.trending_score}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/trending"
            className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            <span>查看完整热门榜单</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 