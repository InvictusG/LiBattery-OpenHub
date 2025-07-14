'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblings?: number
}

export function Pagination({ currentPage, totalPages, onPageChange, siblings = 1 }: PaginationProps) {
  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblings * 2 + 3 + 2
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
      return [...leftRange, '...', totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1)
      return [1, '...', ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i)
      return [1, '...', ...middleRange, '...', totalPages]
    }
    return []
  }, [totalPages, siblings, currentPage])

  if (totalPages <= 1) {
    return null
  }

  const goToPrevious = () => onPageChange(Math.max(1, currentPage - 1))
  const goToNext = () => onPageChange(Math.min(totalPages, currentPage + 1))

  return (
    <nav className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={goToPrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {paginationRange.map((pageNumber, index) => {
        if (typeof pageNumber === 'string') {
          return (
            <Button key={`dots-${index}`} variant="ghost" size="icon" disabled className="cursor-default">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )
        }
        return (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(pageNumber)}
            className={cn({
              'font-bold': pageNumber === currentPage,
            })}
            aria-label={`Go to page ${pageNumber}`}
          >
            {pageNumber}
          </Button>
        )
      })}
      <Button
        variant="outline"
        size="icon"
        onClick={goToNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
} 