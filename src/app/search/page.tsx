'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Filter, SortAsc, SortDesc, Grid, List, Star, GitFork, Calendar, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SearchFilters } from '@/components/search/search-filters'
import { SearchResults } from '@/components/search/search-results'
import { mockRepositories } from '@/lib/mock-data'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  language: string
  stars: number
  forks: number
  updated_at: string
  topics: string[]
  category: string
  html_url: string
  license?: string
  archived: boolean
}

interface SearchFilters {
  category: string
  language: string
  minStars: string
  maxStars: string
  hasLicense: string
  sortBy: string
  sortOrder: string
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const filteredRepos = mockRepositories.filter(repo =>
    repo.name.toLowerCase().includes(query.toLowerCase()) ||
    repo.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-4 lg:grid-cols-5">
      <aside className="md:col-span-1 lg:col-span-1">
        <div className="sticky top-20">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-200">
            <Filter className="mr-2 inline-block h-5 w-5" />
            Filters
          </h2>
          <div className="mt-6">
            <SearchFilters />
          </div>
        </div>
      </aside>
      <div className="md:col-span-3 lg:col-span-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {query ? `Results for: "${query}"` : 'Explore All Projects'}
        </h1>
        <div className="mt-6">
          <SearchResults repositories={filteredRepos} />
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <SearchPageContent />
    </Suspense>
  )
} 