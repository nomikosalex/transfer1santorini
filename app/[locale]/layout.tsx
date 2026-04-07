import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { PageTransition } from '@/components/PageTransition'

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

export const metadata: Metadata = {
  title: 'Pep Santorini | Premium Private Transfer',
  description:
    'Exclusive white Mercedes private transfer service in Santorini. Unmatched privacy, comfort, and luxury across the island. Book your elite chauffeur experience.',
  keywords: ['Santorini transfer', 'luxury chauffeur', 'private transfer', 'Mercedes Santorini'],
  openGraph: {
    title: 'Pep Santorini | Premium Private Transfer',
    description: 'The most private transfer service on Santorini island.',
    type: 'website',
  },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
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

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <PageTransition>
            {children}
          </PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
