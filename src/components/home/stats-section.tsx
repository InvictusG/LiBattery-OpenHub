"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, GitFork, Users, TrendingUp, CheckCircle } from "lucide-react";
import CountUp from "react-countup";

const stats = [
  {
    icon: Database,
    value: 1200,
    label: "Open Source Projects",
    suffix: "+",
  },
  {
    icon: GitFork,
    value: 50,
    label: "Total Stars",
    suffix: "K+",
  },
  {
    icon: Users,
    value: 5,
    label: "Active Experts",
    suffix: "K+",
  },
  {
    icon: TrendingUp,
    value: 300,
    label: "Monthly Updates",
    suffix: "+",
  },
];

const AnimatedStat = ({ stat }: { stat: typeof stats[0] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = stat.icon;

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
        <div className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white">
          <CountUp
            start={0}
            end={isInView ? stat.value : 0}
            duration={2.5}
            separator=","
          />
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
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Powering a Global Battery Ecosystem
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            A central hub for data, tools, and expertise in battery technology.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
} 