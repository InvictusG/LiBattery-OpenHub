'use client'

import React, { Suspense, useMemo, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import type { Repository, ApiResponse } from '@/types'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Loader2, ServerCrash, Calendar, Github, ExternalLink } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(res => res.json());

function TimeRangeButton({ range, currentRange, setRange, label }: { range: string, currentRange: string, setRange: (range: string) => void, label: string }) {
  const isActive = currentRange === range;
  return (
    <button
      onClick={() => setRange(range)}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
      }`}
    >
      {label}
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
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
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
  
  const apiUrl = `/api/trending?${searchParams.toString()}`
  const { data: languagesResponse } = useSWR('/api/trending/languages', fetcher)

  return (
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

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <TimeRangeButton range="daily" currentRange={since} setRange={handleTimeRangeChange} label="今日" />
          <TimeRangeButton range="weekly" currentRange={since} setRange={handleTimeRangeChange} label="本周" />
          <TimeRangeButton range="monthly" currentRange={since} setRange={handleTimeRangeChange} label="本月" />
        </div>
        
        <div className="relative w-full md:w-auto">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full md:w-64 appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-10 text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
          >
            <option value="">所有语言</option>
            {languagesResponse?.success && languagesResponse.data.map((lang: string) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <Github className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
      
      <Suspense fallback={<TrendingSkeleton />}>
        <TrendingResults apiUrl={apiUrl} />
      </Suspense>
    </div>
  )
}

function TrendingResults({ apiUrl }: { apiUrl: string }) {
  const { data: response, error } = useSWR<ApiResponse<Repository[]>>(apiUrl, fetcher, {
    suspense: true
  });

  if (error) {
    return (
      <div className="text-center py-10 col-span-full bg-red-50 dark:bg-red-900/20 rounded-lg">
        <ServerCrash className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-2 text-xl font-semibold text-red-700 dark:text-red-300">网络请求失败</h3>
        <p className="mt-1 text-red-500 dark:text-red-400">
          请检查您的网络连接或稍后再试。
        </p>
      </div>
    );
  }
  
  if (!response?.success) {
    return (
      <div className="text-center py-10 col-span-full bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <ServerCrash className="mx-auto h-12 w-12 text-yellow-500" />
        <h3 className="mt-2 text-xl font-semibold text-yellow-700 dark:text-yellow-300">获取数据失败</h3>
        <p className="mt-1 text-yellow-500 dark:text-yellow-400">
          {response?.message || '服务器开小差了，请稍后再试。'}
        </p>
      </div>
    );
  }
  
  if (!response.data || response.data.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">无结果</h3>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          当前筛选条件下没有找到热门项目。
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {response.data.map((repo, index) => (
        <ProjectCard repo={repo} key={repo.id || repo.url} index={index} />
      ))}
    </div>
  );
}

const TrendingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {[...Array(9)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse">
        <div className="flex justify-between items-start">
            <div className="flex-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mt-2"></div>
            </div>
            <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>
        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded w-full mt-3"></div>
        <div className="flex justify-between items-center mt-6">
            <div className="flex gap-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
            </div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
        </div>
      </div>
    ))}
  </div>
);


export default function TrendingPage() {
  return (
    <Suspense fallback={<TrendingSkeleton />}>
      <TrendingPageContent />
    </Suspense>
  );
} 