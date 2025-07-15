'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Calendar, Loader2, ServerCrash } from 'lucide-react'
import useSWR from 'swr'
import type { Repository, ApiResponse } from '@/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

// The data structure returned by our /api/repositories endpoint
interface RepositoriesData {
  repositories: Repository[];
  total: number;
  page: number;
  totalPages: number;
}

function ProjectCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const apiUrl = '/api/repositories?q=bms+battery&sort=stars&order=desc&per_page=3'
  const { data: response, error, isLoading } = useSWR<ApiResponse<RepositoriesData>>(apiUrl, fetcher)

  const featuredProjects = response?.data?.repositories || []

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => <ProjectCardSkeleton key={i} />)}
        </div>
      )
    }

    if (error || !response?.success) {
      return (
        <div className="text-center py-10 col-span-full bg-red-50 dark:bg-red-900/20 rounded-lg">
          <ServerCrash className="mx-auto h-10 w-10 text-red-500" />
          <h3 className="mt-2 text-lg font-semibold text-red-700 dark:text-red-300">
            加载精选项目失败
          </h3>
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">
            {response?.message || '无法连接到服务器，请稍后再试。'}
          </p>
        </div>
      )
    }

    if (featuredProjects.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">暂无精选项目</p>
            </div>
        )
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group flex flex-col"
          >
            <div className="p-6 flex-grow">
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
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                {project.description}
              </p>

              {/* Language */}
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {project.language}
                </span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{project.stars.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <GitFork className="h-4 w-4 text-green-500" />
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
    )
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

        {renderContent()}

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