"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// An animated logo component
const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-xl font-bold">
    <Sparkles className="h-6 w-6 text-indigo-500" />
    <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
      LiBattery OpenHub
    </span>
  </Link>
);

// Navigation link item
const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "text-slate-900 dark:text-slate-50"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
      )}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </Link>
  );
};

// Main Navbar component
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navLinks = [
    { name: "首页", href: "/" },
    { name: "探索", href: "/search" },
    { name: "分类", href: "/categories" },
    { name: "趋势", href: "/trending" },
    { name: "贡献", href: "/contribute" },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMenuOpen
          ? "bg-white/80 shadow-md backdrop-blur-sm dark:bg-slate-900/80"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-4 md:flex">
          <AnimatePresence>
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href}>
                {link.name}
              </NavItem>
            ))}
          </AnimatePresence>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/search" className="hidden rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 md:block">
            <Search className="h-5 w-5" />
          </Link>
          <button
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col items-center space-y-4 border-t border-slate-200/50 py-4 dark:border-slate-800/50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-full px-8 py-2 text-center text-lg font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 