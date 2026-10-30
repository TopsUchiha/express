import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ChatWidgetLazy } from '@/components/chat/chat-widget-lazy'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.company.name} | Global Logistics & Freight Forwarding`,
    template: `%s | ${siteConfig.company.name}`,
  },
  description: siteConfig.company.description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.company.name,
    title: `${siteConfig.company.name} | Global Logistics & Freight Forwarding`,
    description: siteConfig.company.description,
    images: [{ url: '/images/hero-port.jpg', width: 1376, height: 768, alt: 'Container port terminal' }],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0B1A2B',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Reading headers renders per request, so the CSP nonce set in proxy.ts reaches every script tag.
  const isAdmin = (await headers()).get('x-admin') === '1'
  if (isAdmin) {
    return (
      <html lang="en" className={`${inter.variable} bg-background`}>
        <body className="min-h-dvh antialiased">{children}</body>
      </html>
    )
  }
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ChatWidgetLazy />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
