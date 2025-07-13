'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/providers/theme-provider'
import { 
  Battery, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Computer,
  Github,
  BookOpen,
  Users,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

// SVG Filter for glass effect
const GlassFilter = () => (
  <svg style={{ display: 'none' }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="10"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
)

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: '首页', icon: Battery },
    { href: '/search', label: '搜索', icon: Search },
    { href: '/categories', label: '分类', icon: BookOpen },
    { href: '/trending', label: '热门', icon: TrendingUp },
    { href: '/contribute', label: '贡献', icon: Users },
  ]

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40' 
          : 'bg-background/0'
      }`}
    >
      <GlassFilter />
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-primary/50 overflow-hidden transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-0 z-0 rounded-xl" style={{ filter: 'url(#glass-distortion)' }} />
              <Battery className="h-5 w-5 text-primary-foreground relative z-10" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              LiBattery OpenHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      href={item.href}
                      className="group flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                    >
                      <Icon className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      <span>{item.label}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <div
              className={`flex w-10 h-8 p-1 rounded-full cursor-pointer transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-zinc-800 border border-zinc-700' 
                  : 'bg-zinc-100 border border-zinc-200'
              }`}
              onClick={() => {
                if (theme === 'light') setTheme('dark')
                else if (theme === 'dark') setTheme('system')
                else setTheme('light')
              }}
              role="button"
              tabIndex={0}
              aria-label="切换主题"
            >
              <div className="flex justify-between items-center w-full">
                <div
                  className={`flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 ${
                    theme === 'dark' 
                      ? 'transform translate-x-0 bg-zinc-700' 
                      : theme === 'light'
                        ? 'transform translate-x-2 bg-white'
                        : 'transform translate-x-1 bg-gradient-to-r from-zinc-300 to-zinc-100'
                  }`}
                >
                  {theme === 'dark' && <Moon className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.5} />}
                  {theme === 'light' && <Sun className="w-3.5 h-3.5 text-amber-500" strokeWidth={1.5} />}
                  {theme === 'system' && <Computer className="w-3.5 h-3.5 text-zinc-600" strokeWidth={1.5} />}
                </div>
              </div>
            </div>

            {/* GitHub link */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
              asChild
            >
              <Link
                href="https://github.com/your-username/libattery-openhub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-xl"
                  aria-label="菜单"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                align="end" 
                className="w-56 p-2 mt-2 border border-border/50 bg-background/95 backdrop-blur-lg"
              >
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className="w-full justify-start"
                        asChild
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  )
} 