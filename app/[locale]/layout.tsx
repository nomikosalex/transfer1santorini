import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { PageTransition } from '@/components/PageTransition'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const cormorant = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

import { getTranslations } from 'next-intl/server'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params
  
  if (!routing.locales.includes(locale as 'en' | 'el' | 'it' | 'fr' | 'de')) {
    return {}
  }
  
  const t = await getTranslations({ locale, namespace: 'metadata' })
  
  return {
    metadataBase: new URL('https://www.transfer1santorini.com'),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `/${locale === 'en' ? '' : locale}`,
      siteName: 'transfer1santorini',
    },
    alternates: {
      canonical: `/${locale === 'en' ? '' : locale}`,
    }
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'el' | 'it' | 'fr' | 'de')) {
    notFound()
  }

  const messages = await getMessages()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "transfer1santorini",
    "image": "https://www.transfer1santorini.com/mercedes.png",
    "url": "https://www.transfer1santorini.com/",
    "telephone": "+30 6986236909",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santorini",
      "addressRegion": "Cyclades",
      "addressCountry": "GR"
    },
    "areaServed": "Santorini (Thira), Greece",
    "priceRange": "$$$"
  }

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <PageTransition>
            {children}
          </PageTransition>
          <WhatsAppButton />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
