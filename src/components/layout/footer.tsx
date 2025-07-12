import React from 'react'
import Link from 'next/link'
import { Battery, Github, Mail, Heart, ExternalLink } from 'lucide-react'

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
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-green-500">
                <Battery className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                LiBattery OpenHub
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              锂离子电池开源资源聚合平台，为全球电池技术工作者提供最新的开源项目、工具和研究资源。
            </p>
            <div className="flex space-x-4">
              {externalLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              资源导航
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              社区参与
            </h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              关于平台
            </h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} LiBattery OpenHub.</span>
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for the battery community</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Powered by</span>
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Next.js
              </Link>
              <span>•</span>
              <Link
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Tailwind CSS
              </Link>
              <span>•</span>
              <Link
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Vercel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 