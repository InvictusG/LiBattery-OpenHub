import React from 'react'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { CategoryGrid } from '@/components/home/category-grid'
import { StatsSection } from '@/components/home/stats-section'
import { TrendingProjects } from '@/components/home/trending-projects'

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Statistics */}
      <StatsSection />
      
      {/* Category Grid */}
      <CategoryGrid />
      
      {/* Featured Projects */}
      <FeaturedProjects />
      
      {/* Trending Projects */}
      <TrendingProjects />
    </div>
  )
} 