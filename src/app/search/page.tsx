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
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <div className="sticky top-24">
          <h2 className="text-xl font-semibold mb-4">高级搜索</h2>
          <SearchFilters />
        </div>
      </aside>
      <main className="w-full md:w-3/4 lg:w-4/5">
        <h1 className="text-3xl font-bold mb-6">
          {query ? `搜索结果: "${query}"` : '浏览所有项目'}
        </h1>
        <SearchResults repositories={filteredRepos} />
      </main>
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