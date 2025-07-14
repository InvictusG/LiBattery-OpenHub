"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GitFork, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// A component for the animated grid background
const GridBackground = () => (
  <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]">
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-slate-950"></div>
  </div>
);

// The main hero section component
export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      <GridBackground />
      <div className="container relative z-20 mx-auto px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-4 animate-pulse border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400"
            >
              Now tracking over 1,000+ battery projects!
            </Badge>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white"
          >
            The Open-Source <span className="text-blue-600">Lithium Battery</span> Hub
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-400"
          >
            Discover, contribute to, and accelerate the future of battery technology.
            A curated platform for engineers, researchers, and developers.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link href="/search" passHref>
              <Button size="lg" className="group">
                Explore Projects <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contribute" passHref>
              <Button size="lg" variant="outline">
                Contribute Your Project
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-500"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>150+ Contributors</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4" />
              <span>5,000+ Forks</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>20+ Categories</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 