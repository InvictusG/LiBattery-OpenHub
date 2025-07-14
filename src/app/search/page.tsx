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
import type { Repository, ApiResponse } from '@/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    category: '',
    language: '',
    minStars: '',
    hasLicense: '',
  });
  const [sort, setSort] = useState({ sortBy: 'stars', sortOrder: 'desc' })

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams()
    if (query) params.append('q', query)
    if (filters.category) params.append('category', filters.category)
    if (filters.language) params.append('language', filters.language)
    if (filters.minStars) params.append('minStars', filters.minStars)
    if (filters.hasLicense) params.append('hasLicense', filters.hasLicense)
    params.append('sortBy', sort.sortBy)
    params.append('sortOrder', sort.sortOrder)
    params.append('page', page.toString())
    params.append('limit', '12') // Show 12 results per page
    return `/api/repositories?${params.toString()}`
  }, [query, filters, sort, page])

  const { data: apiResponse, error, isLoading } = useSWR<ApiResponse>(apiUrl, fetcher, {
    keepPreviousData: true,
  })

  // This is a debounced search handler, but for simplicity, we'll implement instant search for now.
  // A real-world app would benefit from debouncing this.
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

  // Memoize to prevent re-extracting on every render
  const { uniqueCategories, uniqueLanguages } = useMemo(() => {
    // In a real app, these would come from an API endpoint, not be hardcoded or derived.
    // For now, let's assume they are static or fetched separately.
    return { 
      uniqueCategories: ['bms', 'simulation', 'thermal', 'safety', 'materials', 'data_analysis', 'cell_design', 'life_prediction', 'manufacturing', 'testing', 'modeling', 'optimization', 'other' ], 
      uniqueLanguages: ['Python', 'MATLAB', 'Julia', 'C++', 'JavaScript', 'Java', 'R', 'C#']
    }
  }, []);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
        </div>
      )
    }

    if (error || !apiResponse?.success) {
      return (
        <div className="text-center py-12 col-span-full bg-red-50 dark:bg-red-900/20 rounded-lg">
          <ServerCrash className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-2 text-xl font-semibold text-red-700 dark:text-red-300">
            {apiResponse?.message || 'Failed to load data'}
          </h3>
          <p className="mt-1 text-red-500 dark:text-red-400">
            An error occurred while fetching repositories. Please try again later.
          </p>
        </div>
      )
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
            {query ? `Results for: "${query}"` : 'Explore All Projects'}
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

        {apiResponse?.data && apiResponse.data.total > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Pagination 
              currentPage={page}
              totalPages={apiResponse.data.totalPages}
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