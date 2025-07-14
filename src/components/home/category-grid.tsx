"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cpu, Battery, FlaskConical, Wrench, TestTube, Settings, ArrowRight
} from "lucide-react";
import React from "react";

const categories = [
  { name: 'BMS', description: '134 Projects', icon: Cpu, href: '/categories/BMS' },
  { name: 'Cell Design', description: '156 Projects', icon: Battery, href: '/categories/CELL_DESIGN' },
  { name: 'Materials', description: '123 Projects', icon: FlaskConical, href: '/categories/MATERIALS' },
  { name: 'Recycling', description: '89 Projects', icon: Wrench, href: '/categories/RECYCLING' },
  { name: 'Testing', description: '98 Projects', icon: TestTube, href: '/categories/TESTING' },
  { name: 'Manufacturing', description: '45 Projects', icon: Settings, href: '/categories/PACK_MANUFACTURING' },
];

const CategoryCard = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const Icon = category.icon;

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
      <Link href={category.href} className="group relative block h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="relative z-10">
          <Icon className="mb-4 h-8 w-8 text-blue-600 dark:text-blue-500" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{category.name}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-500">
            View Projects <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
        {/* Glow effect */}
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Explore by Technical Category
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Quickly find open source projects in your area of interest.
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category, i) => (
            <CategoryCard key={category.name} category={category} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
} 