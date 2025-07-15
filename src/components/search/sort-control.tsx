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
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">排序:</span>
      <Select 
        value={sort.sortBy} 
        onValueChange={(value) => onSortChange(value, sort.sortOrder)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="选择排序方式" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stars">星标数最多</SelectItem>
          <SelectItem value="relevance_score">相关性</SelectItem>
          <SelectItem value="updated_at">最近更新</SelectItem>
          <SelectItem value="created_at">创建日期</SelectItem>
          <SelectItem value="forks_count">Fork数</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onSortChange(sort.sortBy, sort.sortOrder === 'desc' ? 'asc' : 'desc')}
        aria-label="切换排序顺序"
      >
        {sort.sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
      </Button>
    </div>
  )
} 