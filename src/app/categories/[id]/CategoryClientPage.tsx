"use client";
    
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { 
  ArrowLeft, Search, SortAsc, SortDesc, Book, Package, Loader2
} from 'lucide-react';
import { Repository, Category } from '@/types';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategoryClientPageProps {
  category: Category;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoryClientPage({ category }: CategoryClientPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [sortOrder, setSortOrder] = useState('desc');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const apiUrl = `/api/repositories?q=${encodeURIComponent(category.name)} ${encodeURIComponent(debouncedSearchQuery)}&sort=${sortBy}&order=${sortOrder}&per_page=30`;
  
  const { data, error } = useSWR(apiUrl, fetcher);

  const isLoading = !data && !error;
  const projects: Repository[] = data?.data?.repositories || [];

  if (!category) {
    // This case should ideally be handled by the server component with notFound()
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-center">
        <div>
          <Package className="mx-auto h-12 w-12 text-slate-400" />
          <h1 className="mt-4 text-2xl font-bold">分类未找到</h1>
          <p className="mt-2 text-slate-500">您正在寻找的分类不存在。</p>
          <Button asChild className="mt-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回首页
          </Link>
        </Button>
      </motion.div>

      <header className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
            <Book className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{category.name}</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">{category.description}</p>
          </div>
        </div>
      </header>
      
      <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="在此分类中搜索..."
              className="w-full pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">排序方式:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">星标数</SelectItem>
                <SelectItem value="forks">Fork数</SelectItem>
                <SelectItem value="updated">最近更新</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
              {sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="col-span-full py-12 text-center text-red-500">
          <Package className="mx-auto h-12 w-12" />
          <h3 className="mt-2 text-xl font-semibold">项目加载失败。</h3>
          <p className="mt-1 text-sm">{error.message || '请稍后再试。'}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="col-span-full py-12 text-center">
           <Package className="mx-auto h-12 w-12 text-slate-400" />
           <h3 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-200">未找到匹配的项目</h3>
           <p className="mt-1 text-slate-500 dark:text-slate-400">请尝试调整您的搜索条件。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}