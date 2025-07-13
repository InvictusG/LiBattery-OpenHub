'use client'

import React from 'react'
import { Filter } from 'lucide-react'

export function SearchFilters() {
  const categories = [
    '电芯设计', '寿命预测', 'BMS系统', '模拟工具', '热管理',
    '安全监控', '材料科学', '制造工艺', '测试工具', '数据分析',
    '数学建模', '优化算法'
  ]

  const languages = ['Python', 'MATLAB', 'C++', 'Julia', 'R', 'JavaScript', 'Java']

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">筛选器</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">分类</label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
            <option value="">全部分类</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">编程语言</label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
            <option value="">全部语言</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">最小星标数</label>
          <input
            type="number"
            placeholder="例如: 100"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">许可证</label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500">
            <option value="">不限</option>
            <option value="true">有许可证</option>
            <option value="false">无许可证</option>
          </select>
        </div>
      </div>
    </div>
  )
} 