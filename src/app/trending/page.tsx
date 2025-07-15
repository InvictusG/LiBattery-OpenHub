'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Star, 
  GitFork, 
  ExternalLink,
  Filter,
  ArrowUp,
  Loader2,
  ServerCrash
} from 'lucide-react'
import useSWR from 'swr'
import type { Repository, ApiResponse } from '@/types'

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface RepositoriesData {
    repositories: Repository[];
    total: number;
    page: number;
    totalPages: number;
}

interface StatsData {
  uniqueLanguages: string[];
  uniqueCategories: { id: string; name: string }[];
}

function TrendingListItemSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-md p-6 animate-pulse mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <div className="h-8 w-10 bg-gray-200 dark:bg-gray-700 rounded mr-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/5"></div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4 ml-14"></div>
          <div className="flex items-center space-x-6 ml-14">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
        <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}

export default function TrendingPage() {
  const [timeRange, setTimeRange] = useState('week')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [languageFilter, setLanguageFilter] = useState('')

  const { data: statsData, error: statsError } = useSWR<ApiResponse<StatsData>>('/api/stats', fetcher);
  const categories = statsData?.data?.uniqueCategories || [];
  const languages = statsData?.data?.uniqueLanguages || [];

  const timeRanges = [
    { value: 'day', label: '今日' },
    { value: 'week', label: '本周' },
    { value: 'month', label: '本月' },
  ]

  const getDateRange = () => {
    const date = new Date();
    switch (timeRange) {
      case 'day':
        date.setDate(date.getDate() - 1);
        break;
      case 'month':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'week':
      default:
        date.setDate(date.getDate() - 7);
        break;
    }
    return date.toISOString().split('T')[0];
  }

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    const categoryName = categories.find(c => c.id === categoryFilter)?.name.split('(')[0].trim() || '';
    const queryParts = ['battery', categoryName, `created:>${getDateRange()}`].filter(Boolean);
    
    if (languageFilter) {
      queryParts.push(`language:${languageFilter}`);
    }

    params.append('q', queryParts.join(' '));
    params.append('sort', 'stars');
    params.append('order', 'desc');
    params.append('per_page', '20');
    return `/api/repositories?${params.toString()}`;
  }, [timeRange, categoryFilter, languageFilter, categories]);

  const { data: repoResponse, error: repoError, isLoading } = useSWR<ApiResponse<RepositoriesData>>(apiUrl, fetcher);

  const filteredRepositories = repoResponse?.data?.repositories || [];

  const renderContent = () => {
    if (isLoading) {
      return [...Array(10)].map((_, i) => <TrendingListItemSkeleton key={i} />);
    }

    if (repoError || !repoResponse?.success) {
      return (
        <div className="text-center py-10 col-span-full bg-red-50 dark:bg-red-900/20 rounded-lg">
          <ServerCrash className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-xl font-semibold text-red-700 dark:text-red-300">获取数据失败</h3>
          <p className="mt-1 text-red-500 dark:text-red-400">
            {repoResponse?.message || '服务器开小差了，请稍后再试。'}
          </p>
        </div>
      );
    }

    if (filteredRepositories.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500 dark:text-gray-400">找不到相关项目，请尝试调整过滤器。</p>
        </div>
      );
    }
    
    return filteredRepositories.map((repo, index) => (
      <motion.div
        key={repo.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-blue-500 p-6 mb-6 group"
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 mr-4 w-10 text-center">#{index + 1}</span>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {repo.full_name}
                </Link>
              </h2>
            </div>
            <p className="ml-14 text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
              {repo.description}
            </p>
            <div className="ml-14 flex items-center flex-wrap gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Star className="h-4 w-4 mr-1.5 text-yellow-500" />
                <b>{repo.stars.toLocaleString()}</b>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <GitFork className="h-4 w-4 mr-1.5 text-green-500" />
                <b>{repo.forks.toLocaleString()}</b>
              </div>
              {repo.language && (
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                   <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  {repo.language}
                </div>
              )}
            </div>
          </div>
          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
            <ExternalLink className="h-6 w-6" />
          </Link>
        </div>
      </motion.div>
    ));
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg rounded-full px-6 py-3 mb-4">
            <TrendingUp className="h-7 w-7 text-blue-500 mr-3" />
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
              热门项目趋势
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            发现社区中快速增长的明日之星
          </p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-20 z-10 rounded-xl shadow-md p-4 mb-8 flex flex-wrap items-center gap-4"
        >
            <div className="flex items-center text-gray-700 dark:text-gray-200 font-medium">
                <Filter className="h-5 w-5 mr-2" />
                筛选条件:
            </div>
            <div className="flex items-center gap-4 flex-wrap">
                <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-700 border-none rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                >
                    {timeRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                </select>
                <select 
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-700 border-none rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                    disabled={!statsData || statsError}
                >
                    <option value="">所有语言</option>
                    {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                    ))}
                </select>
                <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-700 border-none rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                    disabled={!statsData || statsError}
                >
                    <option value="">所有分类</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
        </motion.div>
        
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
} 