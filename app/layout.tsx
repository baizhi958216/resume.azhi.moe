import type { Metadata, Viewport } from 'next'
import { env } from 'node:process'
import { headers } from 'next/headers'
import Script from 'next/script'
import PageMotion from './PageMotion'
import SmoothScroll from './SmoothScroll'
import '@fontsource-variable/instrument-sans'
import '@fontsource-variable/noto-sans-sc'
import 'lxgw-wenkai-webfont/lxgwwenkai-regular.css'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f4ed' },
    { media: '(prefers-color-scheme: dark)', color: '#111318' },
  ],
}

const themeInitScript = `(function(){try{var saved=localStorage.getItem('resume-theme');var theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme}catch(e){}})()`
const gtagId = env.NEXT_PUBLIC_GTAG_ID?.trim()

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers()
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host') ?? 'localhost:3000'
  const protocol = requestHeaders.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  const metadataBase = new URL(`${protocol}://${host}`)

  return {
    metadataBase,
    title: '阿纸｜前端开发工程师',
    description: '前端开发工程师阿纸的在线简历：Vue、Nuxt、TypeScript、AI 应用前端与复杂 Web 产品交付经验。',
    keywords: ['阿纸', '前端开发工程师', 'Vue', 'Nuxt', 'AI 应用前端', 'Creative Developer', 'Guangzhou'],
    applicationName: '阿纸前端开发工程师简历',
    authors: [{ name: '阿纸', url: 'https://github.com/baizhi958216' }],
    creator: '阿纸',
    publisher: '阿纸',
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/apple-icon.png',
    },
    alternates: { canonical: '/' },
    openGraph: {
      type: 'profile',
      locale: 'zh_CN',
      title: '阿纸｜前端开发工程师在线简历',
      description: 'Vue / Nuxt / TypeScript · AI 应用前端 · 广州',
      url: '/',
      siteName: '阿纸前端开发工程师简历',
      images: [{ url: '/og-resume.png', width: 1200, height: 630, alt: '阿纸前端开发工程师在线简历' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: '阿纸｜前端开发工程师在线简历',
      description: 'Vue / Nuxt / TypeScript · AI 应用前端 · 广州',
      images: ['/og-resume.png'],
    },
    robots: { index: true, follow: true },
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line react/dom-no-dangerously-set-innerhtml -- 静态主题初始化脚本，不包含用户输入 */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <SmoothScroll />
        <PageMotion />
        {gtagId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              strategy="beforeInteractive"
            />
            <Script id="gtag-init" strategy="beforeInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gtagId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
