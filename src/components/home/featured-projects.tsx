'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Calendar } from 'lucide-react'

export function FeaturedProjects() {
  // 模拟数据 - 实际应用中从API获取
  const featuredProjects = [
    {
      id: 1,
      name: 'PyBaMM',
      full_name: 'pybamm-team/PyBaMM',
      description: 'Python Battery Mathematical Modeling (PyBaMM) 是一个开源的电池建模包，提供了快速、灵活且准确的电池模拟工具。',
      language: 'Python',
      stars: 1200,
      forks: 340,
      updated_at: '2024-01-15',
      topics: ['battery-modeling', 'simulation', 'python', 'electrochemistry'],
      category: '模拟工具',
      html_url: 'https://github.com/pybamm-team/PyBaMM',
    },
    {
      id: 2,
      name: 'BEEP',
      full_name: 'TRI-AMDD/beep',
      description: 'Battery Evaluation and Early Prediction (BEEP) 是一个用于电池数据分析和早期预测的开源平台。',
      language: 'Python',
      stars: 890,
      forks: 156,
      updated_at: '2024-01-10',
      topics: ['battery-data', 'machine-learning', 'prediction', 'analysis'],
      category: '数据分析',
      html_url: 'https://github.com/TRI-AMDD/beep',
    },
    {
      id: 3,
      name: 'LIONSIMBA',
      full_name: 'lionsimbatoolbox/LIONSIMBA',
      description: 'LIONSIMBA 是一个基于 MATLAB 的锂离子电池仿真工具箱，支持多种电池模型和仿真场景。',
      language: 'MATLAB',
      stars: 456,
      forks: 123,
      updated_at: '2024-01-08',
      topics: ['matlab', 'battery-simulation', 'lithium-ion', 'modeling'],
      category: '仿真建模',
      html_url: 'https://github.com/lionsimbatoolbox/LIONSIMBA',
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

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
            精选项目
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            由社区推荐的高质量锂离子电池开源项目
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {project.full_name}
                    </p>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                      {project.category}
                    </span>
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

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Language */}
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {project.language}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <Star className="h-4 w-4" />
                      <span>{project.stars.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <GitFork className="h-4 w-4" />
                      <span>{project.forks.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(project.updated_at)}</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-2">
                  {project.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                  {project.topics.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                      +{project.topics.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/search"
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            <span>查看更多项目</span>
            <ExternalLink className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 