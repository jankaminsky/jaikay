import type { Metadata } from 'next'
import { Inter_Tight, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '@/components/globals/Header'
import { Footer } from '@/components/globals/Footer'
import '../../globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-mono',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  let faviconUrl = '/favicon.ico'

  try {
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings',
      locale: locale as 'en' | 'fr',
    })
    if (siteSettings?.favicon && typeof siteSettings.favicon === 'object') {
      faviconUrl = siteSettings.favicon.url || faviconUrl
    }
  } catch (error) {
    console.error('Error fetching site-settings:', error)
  }

  return {
    title: 'JAIKAY | Digital Creative Studio in Montréal',
    description: 'JAIKAY is a digital creative studio in Montréal building scalable websites, brand identities, and digital systems for modern businesses.',
    icons: {
      icon: faviconUrl,
    },
  }
}
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const header = await payload.findGlobal({ slug: 'header', locale: locale as 'en' | 'fr' })
  const footer = await payload.findGlobal({ slug: 'footer', locale: locale as 'en' | 'fr' })

  return (
    <html lang={locale} className={`${interTight.variable} ${spaceMono.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header header={header} locale={locale} />
        {children}
        <Footer footer={footer} />
        <Script id="hs-script-loader" strategy="afterInteractive" src="//js-na3.hs-scripts.com/342977528.js" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-LZD4XQB042"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LZD4XQB042');
          `}
        </Script>
      </body>
    </html>
  )
}
