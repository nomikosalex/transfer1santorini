import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.transfer1santorini.com'

  const routes = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale === 'en' ? '' : locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  return routes
}
