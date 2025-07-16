"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, GitFork, Users, Code, ServerCrash } from "lucide-react";
import CountUp from "react-countup";
import useSWR from 'swr';
import type { ApiResponse } from '@/types';

interface StatsData {
  totalProjects: number;
  totalStars: number;
  uniqueLanguages: string[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AnimatedStat = ({ stat, isLoading, error }: { stat: any, isLoading: boolean, error: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = stat.icon;

  let value = stat.value;
  if (isLoading) value = 0;
  if (error) value = 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-blue-50/50 to-transparent opacity-50 dark:from-blue-900/20"></div>
      <div className="relative">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-4xl font-bold text-slate-900 dark:text-white">
          {error ? 'Error' : (
            <CountUp
              start={0}
              end={isInView ? value : 0}
              duration={2.5}
              separator=","
            />
          )}
          {stat.suffix}
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
};

export function StatsSection() {
  const { data: response, error, isLoading } = useSWR<ApiResponse<StatsData>>('/api/stats', fetcher);

  const statsData = response?.data;

  const stats = [
    {
      icon: Database,
      value: statsData?.totalProjects || 0,
      label: "收录项目",
      suffix: "+",
    },
    {
      icon: GitFork,
      value: Math.floor((statsData?.totalStars || 0) / 1000), // Display in K
      label: "总星标数",
      suffix: "K+",
    },
    {
      icon: Code,
      value: statsData?.uniqueLanguages.length || 0,
      label: "编程语言",
      suffix: "+",
    },
    {
      icon: Users,
      value: 5, // Static value
      label: "活跃社区",
      suffix: "K+",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            驱动全球电池生态系统
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            数据、工具和专业知识的中心枢纽
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} isLoading={isLoading} error={error} />
          ))}
        </div>
      </div>
    </section>
  );
} 