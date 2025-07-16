'use client'

import React from 'react'
import { Package } from 'lucide-react'
import { Repository } from '@/types'
import { ProjectCard } from '@/components/ui/ProjectCard' // Import the new card

export const SearchResultsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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


interface SearchResultsProps {
  repositories: Repository[]
}

export function SearchResults({ repositories }: SearchResultsProps) {
  if (repositories.length === 0) {
    return (
      <div className="text-center py-12 col-span-full">
        <Package className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-200">No Results Found</h3>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Try adjusting your search terms or filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo, index) => (
        <ProjectCard key={repo.id} repo={repo} index={index} />
      ))}
    </div>
  )
} 