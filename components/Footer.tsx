'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function Footer() {
  const t = useTranslations('footer')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <footer className="relative overflow-hidden" ref={ref}>
      <div className="gold-line-full" />

      <div
        className="bg-obsidian-2"
        style={{ padding: '48px 0 32px' }}
      >
        <div className="container">
          {/* Top row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10"
          >
            {/* Logo */}
            <div className="flex flex-col">
              <span
                className="font-display text-marble"
                style={{ fontSize: 28, fontWeight: 300, letterSpacing: '0.1em' }}
              >
                PEP
              </span>
              <span
                className="font-body text-gold"
                style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' }}
              >
                Santorini
              </span>
            </div>

            {/* Tagline */}
            <p
              className="font-body text-marble-dim"
              style={{ fontSize: 13, fontWeight: 300, maxWidth: 300 }}
            >
              {t('tagline')}
            </p>

            {/* Contact icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/30"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp-link"
                aria-label="Contact via WhatsApp"
                className="btn-ghost"
                style={{ padding: '8px 16px', fontSize: 11 }}
              >
                WhatsApp
              </a>
              <a
                href="mailto:info@pepsantorini.com"
                id="footer-email-link"
                aria-label="Contact via Email"
                className="btn-ghost"
                style={{ padding: '8px 16px', fontSize: 11 }}
              >
                Email
              </a>
            </div>
          </motion.div>

          <div className="gold-line-full opacity-50" />

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6"
          >
            <p
              className="font-body text-marble-dim"
              style={{ fontSize: 11, letterSpacing: '0.05em' }}
            >
              © {new Date().getFullYear()} Pep Santorini. {t('rights')}
            </p>

            <div className="flex items-center gap-6">
              {[
                { key: 'privacy', label: t('privacy') },
                { key: 'terms', label: t('terms') },
              ].map((link) => (
                <a
                  key={link.key}
                  href={`/${link.key}`}
                  id={`footer-${link.key}-link`}
                  className="font-body text-marble-dim hover:text-gold-2 transition-colors"
                  style={{ fontSize: 11, letterSpacing: '0.05em', textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <div
                className="pulse-gold"
                style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }}
              />
              <span
                className="font-body text-marble-dim"
                style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Santorini, Greece
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 120,
          fontFamily: 'Georgia, serif',
          fontWeight: 300,
          letterSpacing: '-0.05em',
          color: 'rgba(255,255,255,0.015)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        PEP
      </div>
    </footer>
  )
}
