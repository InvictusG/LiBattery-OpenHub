"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cpu, Battery, FlaskConical, Wrench, TestTube, Settings, ArrowRight,
  Recycle, LifeBuoy, Factory, Beaker, BrainCircuit, LineChart, FileText
} from "lucide-react";
import React from "react";
import { categories as allCategories } from '@/lib/categories'; // Import the single source of truth

// Map category IDs to icons for better maintainability
const iconMap: Record<string, React.ElementType> = {
  bms: Cpu,
  cell_design: Battery,
  materials: FlaskConical,
  recycling: Recycle,
  testing: TestTube,
  pack_manufacturing: Settings,
  life_prediction: LineChart,
  simulation: BrainCircuit,
  thermal: LifeBuoy,
  safety: LifeBuoy,
  manufacturing: Factory,
  data_analysis: Beaker,
  modeling: BrainCircuit,
  optimization: BrainCircuit,
  other: FileText,
};

const CategoryCard = ({ category, index }: { category: typeof allCategories[0], index: number }) => {
  const Icon = iconMap[category.id] || FileText; // Fallback to a default icon

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={cardVariants}>
      <Link href={`/categories/${category.id}`} className="group relative block h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50">
        <div className="relative z-10">
          <Icon className="mb-4 h-8 w-8 text-blue-600 dark:text-blue-500" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{category.name}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
          <div className="mt-6 flex items-center text-sm font-medium text-blue-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-500">
            Explore <ArrowRight className="ml-1.5 h-4 w-4" />
          </div>
        </div>
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:[background:radial-gradient(600px_at_50%_50%,rgba(29,78,216,0.1),transparent_80%)]"></div>
      </Link>
    </motion.div>
  );
};

export function CategoryGrid() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Explore by Technical Category
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            From Battery Management Systems to materials science, find projects in your specific area of interest.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {allCategories.slice(0, 8).map((category, i) => ( // Show top 8 categories
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
} 