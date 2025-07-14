'use client'

import React from 'react'
import { Filter } from 'lucide-react'

interface SearchFiltersProps {
  filters: {
    category: string;
    language: string;
    minStars: string;
    hasLicense: string;
  };
  onFilterChange: (key: string, value: string) => void;
  categories: string[];
  languages: string[];
}

export function SearchFilters({ filters, onFilterChange, categories, languages }: SearchFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFilterChange(e.target.name, e.target.value);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 mr-3 text-slate-600 dark:text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Filters</h3>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Language</label>
          <select
            id="language"
            name="language"
            value={filters.language}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="minStars" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Minimum Stars</label>
          <input
            type="number"
            id="minStars"
            name="minStars"
            value={filters.minStars}
            onChange={handleInputChange}
            placeholder="e.g., 100"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        
        <div>
          <label htmlFor="hasLicense" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">License</label>
          <select
            id="hasLicense"
            name="hasLicense"
            value={filters.hasLicense}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Any</option>
            <option value="true">With License</option>
            <option value="false">Without License</option>
          </select>
        </div>
      </div>
    </div>
  )
} 