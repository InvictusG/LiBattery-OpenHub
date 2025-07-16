'use client'

import React, { Suspense, useMemo, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Star, 
  GitFork, 
  ExternalLink,
  Filter,
  ArrowUp,
  Loader2,
  ServerCrash,
  Calendar,
  Github
} from 'lucide-react'
import useSWR from 'swr'
import type { Repository, ApiResponse } from '@/types'
import { ProjectCard } from '@/components/ui/ProjectCard'

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

function TimeRangeButton({ range, currentRange, setRange }: { range: string, currentRange: string, setRange: (range: string) => void }) {
  const isActive = currentRange === range;
  return (
    <button
      onClick={() => setRange(range)}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-700'
      }`}
    >
      {range}
    </button>
  );
}

function TrendingPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )
  
  const since = searchParams.get('since') || 'daily'
  const language = searchParams.get('language') || ''

  const handleTimeRangeChange = (newRange: string) => {
    router.push(`${pathname}?${createQueryString('since', newRange)}`, { scroll: false })
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`${pathname}?${createQueryString('language', e.target.value)}`, { scroll: false })
  }

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams()
    params.append('since', since)
    if (language) {
      params.append('language', language)
    }
    return `/api/trending?${params.toString()}`
  }, [since, language])

  const { data, error, isLoading } = useSWR<ApiResponse<Repository[]>>(apiUrl, fetcher)
  
  const { data: languagesData } = useSWR<string[]>('/api/trending/languages', fetcher)

  const renderContent = () => {
    if (isLoading) {
      return [...Array(10)].map((_, i) => <TrendingListItemSkeleton key={i} />);
    }

    if (error || !data?.success) {
      return (
        <div className="text-center py-10 col-span-full bg-red-50 dark:bg-red-900/20 rounded-lg">
          <ServerCrash className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-xl font-semibold text-red-700 dark:text-red-300">获取数据失败</h3>
          <p className="mt-1 text-red-500 dark:text-red-400">
            {data?.message || '服务器开小差了，请稍后再试。'}
          </p>
        </div>
      );
    }

    if (data?.data?.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500 dark:text-gray-400">找不到相关项目，请尝试调整过滤器。</p>
        </div>
      );
    }
    
    return data?.data?.map((repo, index) => (
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
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {repo.full_name}
                </a>
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
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
            <ExternalLink className="h-6 w-6" />
          </a>
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50">
            热门项目
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
                <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <TimeRangeButton range="daily" currentRange={since} setRange={handleTimeRangeChange} />
                  <TimeRangeButton range="weekly" currentRange={since} setRange={handleTimeRangeChange} />
                  <TimeRangeButton range="monthly" currentRange={since} setRange={handleTimeRangeChange} />
                </div>
                
                <div className="relative w-full md:w-64 appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-10 text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="w-full md:w-64 appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-10 text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                  >
                    <option value="">所有语言</option>
                    {languagesData?.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <Github className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                </div>
            </div>
        </motion.div>
        
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default function TrendingPage() {
  return (
    <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin mx-auto" />}>
      <TrendingPageContent />
    </Suspense>
  );
} 