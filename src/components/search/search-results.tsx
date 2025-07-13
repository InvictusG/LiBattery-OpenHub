'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, GitFork, ExternalLink, Calendar, Package, Layers } from 'lucide-react'
import { Repository } from '@/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SearchResultsProps {
  repositories: Repository[]
}

export function SearchResults({ repositories }: SearchResultsProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12 col-span-full">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-xl font-semibold text-foreground">未找到结果</h3>
        <p className="mt-1 text-muted-foreground">请尝试调整您的搜索词或筛选条件。</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo, index) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="h-full"
        >
          <Card className="flex flex-col h-full bg-background/80 backdrop-blur-sm border-border/40 hover:border-border/80 hover:bg-background/90 transition-all duration-300 group">
            <CardHeader className="flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg font-bold">
                  <Link href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {repo.name}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{repo.owner}</p>
              </div>
               <Link href={repo.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3 h-[60px]">{repo.description}</p>
              <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{repo.stars.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="h-4 w-4" />
                  <span>{repo.forks.toLocaleString()}</span>
                </div>
              </div>
               <div className="flex items-center text-sm text-muted-foreground space-x-2">
                 <Layers className="h-4 w-4" />
                 <Badge variant="secondary">{repo.category}</Badge>
               </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
              {repo.topics.slice(0, 4).map((topic) => (
                <Badge key={topic} variant="outline" className="font-normal">
                  {topic}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
} 