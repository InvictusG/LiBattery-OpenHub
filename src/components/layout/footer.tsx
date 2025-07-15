"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerNavs = [
  {
    label: "产品",
    items: [
      { href: "/search", name: "探索" },
      { href: "/categories", name: "分类" },
      { href: "/trending", name: "趋势" },
      { href: "/contribute", name: "贡献" },
    ],
  },
  {
    label: "社区",
    items: [
      { href: "https://github.com/InvictusG/LiBattery-OpenHub", name: "GitHub" },
      { href: "#", name: "Discord (即将推出)" },
      { href: "#", name: "Twitter (即将推出)" },
    ],
  },
  {
    label: "法律",
    items: [
      { href: "#", name: "服务条款" },
      { href: "#", name: "隐私政策" },
      { href: "#", name: "项目许可证" },
    ],
  },
];

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 text-xl font-bold">
    <Sparkles className="h-6 w-6 text-indigo-500" />
    <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
      锂电池开源中心
    </span>
  </Link>
);


export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              一个专注于发现、分享和加速锂电池技术创新的开源资源聚合平台。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  {nav.label}
                </h3>
                <ul className="mt-4 space-y-3">
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
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500 dark:border-slate-800 sm:text-left">
          <p>&copy; {new Date().getFullYear()} LiBattery OpenHub. All Rights Reserved. </p>
        </div>
      </div>
    </footer>
  );
} 