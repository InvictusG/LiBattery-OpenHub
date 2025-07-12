import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LiBattery OpenHub - 锂离子电池开源资源中心',
  description: '专业的锂离子电池开源项目聚合平台，为工程师、研究人员和开发者提供最新的电池技术资源、模拟工具和数据分析代码。',
  keywords: '锂离子电池,开源项目,电池技术,BMS,电芯设计,寿命预测,模拟工具',
  authors: [{ name: 'LiBattery OpenHub Team' }],
  creator: 'LiBattery OpenHub',
  publisher: 'LiBattery OpenHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: 'LiBattery OpenHub - 锂离子电池开源资源中心',
    description: '专业的锂离子电池开源项目聚合平台',
    siteName: 'LiBattery OpenHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LiBattery OpenHub - 锂离子电池开源资源中心',
    description: '专业的锂离子电池开源项目聚合平台',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 