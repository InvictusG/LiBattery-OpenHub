"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, GitFork, ExternalLink, Tag } from "lucide-react";
import { Repository } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  repo: Repository;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export const ProjectCard = ({ repo, index }: ProjectCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      viewport={{ once: true }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Animated glow effect on hover */}
      <div className="absolute -inset-px rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100 dark:[background:radial-gradient(400px_at_50%_50%,rgba(29,78,216,0.15),transparent_80%)]" />
      
      <div className="flex h-full flex-col">
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-500">{repo.owner.login}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
                {repo.name}
              </h3>
            </div>
            <Link href={repo.url} target="_blank" rel="noopener noreferrer" className="ml-4 flex-shrink-0">
              <ExternalLink className="h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200" />
            </Link>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3 dark:text-slate-400">
            {repo.description}
          </p>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500" />
                {repo.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-4 w-4 text-slate-500" />
                {repo.forks.toLocaleString()}
              </span>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {repo.category}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            {repo.topics.slice(0, 3).map((topic) => (
              <div key={topic} className="flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <Tag className="h-3 w-3" />
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 