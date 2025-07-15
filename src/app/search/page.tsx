'use client'

import React, { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, SortAsc, SortDesc, Loader2, ServerCrash } from 'lucide-react'
import { motion } from 'framer-motion'
import useSWR from 'swr'

import { SearchFilters } from '@/components/search/search-filters'
import { SearchResults } from '@/components/search/search-results'
import { Pagination } from '@/components/search/pagination'
import { SortControl } from '@/components/search/sort-control'
import type { Repository, ApiResponse, Category } from '@/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

// A type for the data returned from our new /api/stats endpoint
interface StatsData {
  uniqueLanguages: string[];
  uniqueCategories: { id: string; name: string }[];
}

// The data structure returned by our /api/repositories endpoint
interface RepositoriesData {
  repositories: Repository[];
  total: number;
  page: number;
  totalPages: number;
}


function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    language: searchParams.get('language') || '',
    minStars: '',
    hasLicense: '',
  });
  const [sort, setSort] = useState({ sortBy: 'stars', sortOrder: 'desc' })

  // Fetch dynamic filter options (languages, categories)
  const { data: statsData, error: statsError } = useSWR<ApiResponse<StatsData>>('/api/stats', fetcher);

  // Memoize the filter options
  const { uniqueCategories, uniqueLanguages } = useMemo(() => ({
    uniqueCategories: statsData?.data?.uniqueCategories || [],
    uniqueLanguages: statsData?.data?.uniqueLanguages || [],
  }), [statsData]);

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams()
    
    // Build query: combine main query and category filter for GitHub API
    let combinedQuery = query;
    if (filters.category) {
      // Find the category name from the ID for a better search experience
      const categoryName = uniqueCategories.find(c => c.id === filters.category)?.name.split('(')[0].trim();
      combinedQuery = `${categoryName || filters.category} ${query}`.trim();
    }
    
    if (combinedQuery) params.append('q', combinedQuery)
    if (filters.language) params.append('language', `language:${filters.language}`) // Correct syntax for GitHub API
    if (filters.minStars) params.append('stars', `>${filters.minStars}`)
    
    params.append('sort', sort.sortBy)
    params.append('order', sort.sortOrder)
    params.append('page', page.toString())
    params.append('per_page', '12') // Show 12 results per page
    return `/api/repositories?${params.toString()}`
  }, [query, filters, sort, page, uniqueCategories])

  const { data: apiResponse, error: searchError, isLoading } = useSWR<ApiResponse<RepositoriesData>>(apiUrl, fetcher, {
    keepPreviousData: true,
  })

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleFilterChange = (key: string, value: string) => {
    setPage(1) // Reset to first page on filter change
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    setPage(1) // Reset to first page on sort change
    setSort({ sortBy, sortOrder })
  }
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
        </div>
      )
    }

    if (searchError || !apiResponse?.success) {
      return (
        <div className="text-center py-12 col-span-full bg-red-50 dark:bg-red-900/20 rounded-lg">
          <ServerCrash className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-xl font-semibold text-red-700 dark:text-red-300">
            {apiResponse?.message || '数据加载失败'}
          </h3>
          <p className="mt-1 text-red-500 dark:text-red-400">
            获取项目存储库时发生错误。请稍后再试。
          </p>
        </div>
      )
    }
    
    if (!apiResponse.data?.repositories || apiResponse.data.repositories.length === 0) {
      return (
        <div className="text-center py-12 col-span-full">
          <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">未找到结果</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            请尝试调整您的搜索查询或筛选条件。
          </p>
        </div>
      );
    }

    return <SearchResults repositories={apiResponse.data.repositories} />
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-4 lg:grid-cols-5">
      <aside className="md:col-span-1 lg:col-span-1">
        <div className="sticky top-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <SearchFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={uniqueCategories}
              languages={uniqueLanguages}
              isLoading={!statsData && !statsError}
            />
          </motion.div>
        </div>
      </aside>
      <main className="md:col-span-3 lg:col-span-4">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4 sm:mb-0">
            {query ? `“${query}”的搜索结果` : '浏览全部项目'}
          </h1>
          <SortControl sort={sort} onSortChange={handleSortChange} />
        </motion.div>
        
        <motion.div 
          className="min-h-[500px]" // Set a min-height to avoid layout shifts
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {renderContent()}
        </motion.div>

        {apiResponse?.data && apiResponse.data.repositories.length > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Pagination 
              currentPage={page}
              totalPages={apiResponse.data?.totalPages || 1}
              onPageChange={setPage}
            />
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-blue-500" /></div>}>
      <SearchPageContent />
    </Suspense>
  )
} 