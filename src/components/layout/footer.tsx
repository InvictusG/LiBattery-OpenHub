"use client";

import { Github, Twitter, Send } from "lucide-react";
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              LiBattery <span className="text-blue-600">OpenHub</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              探索、学习和贡献锂电池技术的未来。
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-500">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-wider uppercase">导航</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/search" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">搜索</Link></li>
                <li><Link href="/trending" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">热门</Link></li>
                <li><Link href="/categories" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">分类</Link></li>
                <li><Link href="/contribute" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">贡献</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-wider uppercase">资源</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">文档</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">API</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">状态</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-wider uppercase">法律</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">隐私政策</a></li>
                <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-blue-600">服务条款</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-wider uppercase">订阅更新</h3>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">获取最新的项目和社区新闻。</p>
              <form className="mt-4 flex">
                <input
                  type="email"
                  placeholder="您的邮箱地址"
                  className="w-full appearance-none rounded-l-md border border-r-0 border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 rounded-r-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} LiBattery OpenHub. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
} 