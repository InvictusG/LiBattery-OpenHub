'use client'

import React from 'react'
import { Filter } from 'lucide-react'

interface CategoryOption {
  id: string;
  name: string;
}

interface SearchFiltersProps {
  filters: {
    category: string;
    language: string;
    minStars: string;
    hasLicense: string;
  };
  onFilterChange: (key: string, value: string) => void;
  categories: CategoryOption[];
  languages: string[];
  isLoading: boolean;
}

const SkeletonLoader = () => (
  <div className="w-full h-9 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
)

export function SearchFilters({ filters, onFilterChange, categories, languages, isLoading }: SearchFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange(e.target.name, e.target.value);
  };

  const renderFilters = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">分类</label>
        {isLoading ? <SkeletonLoader /> : (
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">所有分类</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        )}
      </div>
      
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">语言</label>
        {isLoading ? <SkeletonLoader /> : (
          <select
            id="language"
            name="language"
            value={filters.language}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">所有语言</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        )}
      </div>
      
      <div>
        <label htmlFor="minStars" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">最少 Star 数</label>
        <input
          type="number"
          id="minStars"
          name="minStars"
          value={filters.minStars}
          onChange={handleInputChange}
          placeholder="例如, 100"
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      
      <div>
        <label htmlFor="hasLicense" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">许可证</label>
        <select
          id="hasLicense"
          name="hasLicense"
          value={filters.hasLicense}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="">任意</option>
          <option value="true">有</option>
          <option value="false">无</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 mr-3 text-slate-600 dark:text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">过滤器</h3>
      </div>
      {renderFilters()}
    </div>
  )
} 