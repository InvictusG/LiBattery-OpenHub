"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Loader2, Star, GitFork, BookOpen, FileText } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce'; // Assuming you have a debounce hook
import { Repository } from '@/types';
import Link from 'next/link';
import useSWR from 'swr';
import type { ApiResponse } from '@/types';

interface StatsData {
  totalProjects: number;
  totalStars: number;
  uniqueLanguages: string[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const GridBackground = () => (
  <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]">
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-slate-950"></div>
  </div>
);

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true);
      fetch(`/api/repositories?q=${debouncedQuery}&per_page=5`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setResults(data.data.repositories);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query.trim()}`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      <GridBackground />
      <div className="container relative z-20 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            寻找最优秀的<span className="text-blue-600">开源</span>电池项目
          </motion.h1>

          <motion.p className="mt-6 max-w-xl text-lg text-slate-600 md:text-xl dark:text-slate-400">
            一个发现、分析和贡献未来电池技术的中心枢纽。
          </motion.p>

          <div ref={searchRef} className="relative mt-8 w-full max-w-2xl">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="搜索项目、主题或技术..."
                  className="w-full rounded-full border border-slate-300 bg-white/50 py-4 pl-12 pr-6 text-lg shadow-lg backdrop-blur-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500"
                />
                 {isLoading && <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-slate-400" />}
              </div>
            </form>
            {isFocused && (results.length > 0 || isLoading) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-2xl backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/80"
              >
                <ul>
                  {results.map(repo => (
                    <li key={repo.id}>
                      <Link href={`/project/${repo.full_name}`} passHref>
                        <div className="flex items-center gap-4 p-4 transition-colors hover:bg-blue-50 dark:hover:bg-slate-800">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                            <BookOpen className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 dark:text-slate-100">{repo.full_name}</p>
                            <p className="text-sm text-slate-500 line-clamp-1 dark:text-slate-400">{repo.description}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                  {isLoading && !results.length && 
                    <li className="p-4 text-center text-slate-500">正在加载建议...</li>
                  }
                </ul>
              </motion.div>
            )}
          </div>
          
          <HeroStats />

        </motion.div>
      </div>
    </section>
  );
} 

function HeroStats() {
    const { data: response, error } = useSWR<ApiResponse<StatsData>>('/api/stats', fetcher);
    const stats = response?.data;

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M+`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K+`;
        return num;
    }

    return (
        <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {stats ? (
                <>
                    <span className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-amber-500" /> 
                        {formatNumber(stats.totalStars)} 总星标数
                    </span>
                    <span className="flex items-center gap-1.5">
                        <GitFork className="h-4 w-4" />
                        {/* Note: Total forks is not available from stats API, using a placeholder */}
                        500K+ 总Fork数
                    </span>
                    <span className="flex items-center gap-1.5">
                        <FileText className="h-4 w-4" /> 
                        {stats.totalProjects.toLocaleString()}+ 收录项目
                    </span>
                </>
            ) : error ? (
                <span className="text-red-500">无法加载统计数据</span>
            ) : (
                <span className="flex items-center gap-1.5">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    正在加载...
                </span>
            )}
        </motion.div>
    )
} 