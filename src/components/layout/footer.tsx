"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerNavs = [
  {
    label: "Product",
    items: [
      { href: "/search", name: "Explore" },
      { href: "/categories", name: "Categories" },
      { href: "/trending", name: "Trending" },
      { href: "/contribute", name: "Contribute" },
    ],
  },
  {
    label: "Community",
    items: [
      { href: "#", name: "GitHub" },
      { href: "#", name: "Discord" },
      { href: "#", name: "Twitter" },
      { href: "#", name: "Blog" },
    ],
  },
  {
    label: "Legal",
    items: [
      { href: "#", name: "Terms of Service" },
      { href: "#", name: "Privacy Policy" },
      { href: "#", name: "License" },
    ],
  },
];

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-xl font-bold">
    <Sparkles className="h-6 w-6 text-indigo-500" />
    <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
      LiBattery OpenHub
    </span>
  </Link>
);


export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              The central hub for open-source lithium battery innovation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  {nav.label}
                </h3>
                <ul className="mt-4 space-y-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} LiBattery OpenHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 