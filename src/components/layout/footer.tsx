import React from 'react'
import Link from 'next/link'
import { Battery, Github, Mail, Heart, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    resources: [
      { name: '项目搜索', href: '/search' },
      { name: '分类浏览', href: '/categories' },
      { name: '热门项目', href: '/trending' },
      { name: 'API 文档', href: '/docs' },
    ],
    community: [
      { name: '贡献指南', href: '/contribute' },
      { name: '问题反馈', href: '/feedback' },
      { name: '社区讨论', href: '/discussions' },
      { name: '开发者', href: '/developers' },
    ],
    about: [
      { name: '关于我们', href: '/about' },
      { name: '使用条款', href: '/terms' },
      { name: '隐私政策', href: '/privacy' },
      { name: '联系我们', href: '/contact' },
    ],
  }

  const externalLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/your-username/libattery-openhub',
      icon: Github,
    },
    {
      name: 'Battery University',
      href: 'https://batteryuniversity.com',
      icon: ExternalLink,
    },
    {
      name: 'IEEE Xplore',
      href: 'https://ieeexplore.ieee.org',
      icon: ExternalLink,
    },
  ]

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="group flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-green-500 shadow-md group-hover:shadow-lg transition-all duration-300">
                <Battery className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                LiBattery OpenHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              锂离子电池开源资源聚合平台，为全球电池技术工作者提供最新的开源项目、工具和研究资源。
            </p>
            <div className="flex space-x-3">
              {externalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Button
                    key={link.name}
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-xl h-9 w-9 border-border/60 bg-background/80 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground mb-5">
              资源导航
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground mb-5">
              社区参与
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground mb-5">
              关于平台
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <Separator className="my-8 opacity-50" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} LiBattery OpenHub.</span>
            <span className="flex items-center">
              Built with <Heart className="h-3 w-3 text-red-500 mx-1" /> for the battery community
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Powered by</span>
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Next.js
            </Link>
            <span>•</span>
            <Link
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Tailwind CSS
            </Link>
            <span>•</span>
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Vercel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 