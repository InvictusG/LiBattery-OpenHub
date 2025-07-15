import Link from 'next/link';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { categories } from '@/lib/categories';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Categories | LiBattery OpenHub',
  description: 'Explore all technical categories for open-source lithium battery projects, from BMS to materials science.',
};

const iconMap: Record<string, React.ElementType> = {
  bms: BookOpen,
  cell_design: BookOpen,
  materials: BookOpen,
  recycling: BookOpen,
  testing: BookOpen,
  pack_manufacturing: BookOpen,
  life_prediction: BookOpen,
  simulation: BookOpen,
  thermal: BookOpen,
  safety: BookOpen,
  manufacturing: BookOpen,
  data_analysis: BookOpen,
  modeling: BookOpen,
  optimization: BookOpen,
  other: BookOpen,
};

const CategoryItem = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const Icon = iconMap[category.id] || BookOpen;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/categories/${category.id}`}
        className="group flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
      >
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            <Icon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{category.name}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{category.description}</p>
        </div>
        <div className="mt-4 flex items-center text-sm font-medium text-blue-600 transition-transform duration-200 group-hover:translate-x-1 dark:text-blue-500">
          Explore
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </div>
      </Link>
    </motion.div>
  );
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Explore by Category
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Dive into specific fields of battery technology. Each category aggregates relevant open-source projects for your convenience.
        </p>
      </motion.header>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <CategoryItem key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
} 