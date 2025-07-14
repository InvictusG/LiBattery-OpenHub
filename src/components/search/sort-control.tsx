'use client'

import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { SortAsc, SortDesc } from 'lucide-react'

interface SortControlProps {
  sort: {
    sortBy: string
    sortOrder: string
  }
  onSortChange: (sortBy: string, sortOrder: string) => void
}

export function SortControl({ sort, onSortChange }: SortControlProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Sort by:</span>
      <Select 
        value={sort.sortBy} 
        onValueChange={(value) => onSortChange(value, sort.sortOrder)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stars">Most Stars</SelectItem>
          <SelectItem value="relevance_score">Relevance</SelectItem>
          <SelectItem value="updated_at">Last Updated</SelectItem>
          <SelectItem value="created_at">Date Created</SelectItem>
          <SelectItem value="forks_count">Forks</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onSortChange(sort.sortBy, sort.sortOrder === 'desc' ? 'asc' : 'desc')}
        aria-label="Toggle sort order"
      >
        {sort.sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
      </Button>
    </div>
  )
} 