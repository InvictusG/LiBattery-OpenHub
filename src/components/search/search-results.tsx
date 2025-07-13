'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Calendar, Package } from 'lucide-react'
import { Repository } from '@/types'

interface SearchResultsProps {
  repositories: Repository[]
}

export function SearchResults({ repositories }: SearchResultsProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">未找到结果</h3>
        <p className="mt-1 text-gray-500">请尝试调整您的搜索词或筛选条件。</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo, index) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group repository-card"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/repository/${repo.full_name}`}>{repo.name}</Link>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{repo.full_name}</p>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                  {repo.category}
                </span>
              </div>
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 h-20 line-clamp-4">{repo.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-4">
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
                <span key={topic} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 