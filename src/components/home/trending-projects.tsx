'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Star, GitFork, ExternalLink, Loader2, ServerCrash } from 'lucide-react'
import useSWR from 'swr'
import type { Repository, ApiResponse } from '@/types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface RepositoriesData {
    repositories: Repository[];
    total: number;
    page: number;
    totalPages: number;
}

function TrendingProjectSkeleton() {
    return (
        <div className="mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center mb-2">
                            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 ml-11"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                        <div className="flex items-center space-x-6">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                    </div>
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    )
}


export function TrendingProjects() {
    const getOneWeekAgoDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        return date.toISOString().split('T')[0];
    }
    
    const oneWeekAgo = getOneWeekAgoDate();
    const apiUrl = `/api/repositories?q=battery+created:>${oneWeekAgo}&sort=stars&order=desc&per_page=5`

    const { data: response, error, isLoading } = useSWR<ApiResponse<RepositoriesData>>(apiUrl, fetcher)
    const trendingProjects = response?.data?.repositories || []

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="max-w-4xl mx-auto">
                    {[...Array(5)].map((_, i) => <TrendingProjectSkeleton key={i} />)}
                </div>
            )
        }

        if (error || !response?.success) {
            return (
                <div className="text-center py-10 col-span-full bg-red-50 dark:bg-red-900/20 rounded-lg max-w-4xl mx-auto">
                    <ServerCrash className="mx-auto h-10 w-10 text-red-500" />
                    <h3 className="mt-2 text-lg font-semibold text-red-700 dark:text-red-300">
                        加载热门项目失败
                    </h3>
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                        {response?.message || '无法连接到服务器，请稍后再试。'}
                    </p>
                </div>
            )
        }

        if (trendingProjects.length === 0) {
            return (
                <div className="text-center py-10 max-w-4xl mx-auto">
                    <p className="text-gray-500 dark:text-gray-400">本周暂无热门新项目</p>
                </div>
            )
        }

        return (
            <div className="max-w-4xl mx-auto">
                {trendingProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="mb-6 last:mb-0"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 p-6 group">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <span className="text-2xl font-bold text-orange-500 mr-3">
                                            #{index + 1}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            <Link href={project.html_url} target="_blank" rel="noopener noreferrer">{project.name}</Link>
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 pl-9">
                                        {project.full_name}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 pl-9 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center space-x-6 pl-9">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {project.language || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span>{project.stars.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                                            <GitFork className="h-4 w-4 text-green-500" />
                                            <span>{project.forks.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={project.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-shrink-0"
                                >
                                    <ExternalLink className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        )
    }

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center mb-4">
                        <TrendingUp className="h-8 w-8 text-orange-500 mr-3" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            本周热门
                        </h2>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        社区最受关注的锂离子电池开源项目
                    </p>
                </motion.div>

                {renderContent()}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/trending"
                        className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl transition-colors"
                    >
                        <TrendingUp className="mr-2 h-5 w-5" />
                        <span>查看完整热门榜单</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
} 