'use client'

import React from 'react'
import { Package } from 'lucide-react'
import { Repository } from '@/types'
import { ProjectCard } from '@/components/ui/ProjectCard' // Import the new card

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