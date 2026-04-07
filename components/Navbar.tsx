'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { routing } from '@/i18n/routing'

const LOCALES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'el', label: 'EL', name: 'Ελληνικά' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
]

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function switchLocale(newLocale: string) {
    // Replace locale segment in path
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
    setLangOpen(false)
  }

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(9,9,11,0.92)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
            className="flex flex-col cursor-pointer"
            whileHover={{ opacity: 0.8 }}
          >
            <span
              className="font-display text-marble"
              style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '0.1em' }}
            >
              PEP
            </span>
            <span
              className="font-body text-gold"
              style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '-2px' }}
            >
              Santorini
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink onClick={() => scrollTo('fleet')}>{t('fleet')}</NavLink>
            <NavLink onClick={() => scrollTo('tours')}>{t('tours')}</NavLink>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="lang-btn flex items-center gap-1.5"
                id="lang-switcher-btn"
                aria-expanded={langOpen}
              >
                {LOCALES.find(l => l.code === locale)?.label}
                <svg
                  style={{
                    width: 10, height: 10,
                    transition: 'transform 0.25s',
                    transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                  viewBox="0 0 10 6" fill="none"
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 py-1 rounded-lg border border-[rgba(255,255,255,0.08)] overflow-hidden"
                    style={{ background: 'rgba(20,20,25,0.98)', backdropFilter: 'blur(20px)', minWidth: 130 }}
                  >
                    {LOCALES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors duration-200 ${
                          l.code === locale
                            ? 'text-gold-2 bg-[rgba(201,168,76,0.08)]'
                            : 'text-marble-dim hover:text-marble hover:bg-[rgba(255,255,255,0.04)]'
                        }`}
                        style={{ fontSize: 12, letterSpacing: '0.05em' }}
                      >
                        <span style={{ fontSize: 10, letterSpacing: '0.1em', opacity: 0.6 }}>{l.label}</span>
                        <span>{l.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              id="nav-reserve-btn"
              onClick={() => scrollTo('contact')}
              className="btn-gold"
              style={{ padding: '10px 24px', fontSize: '11px' }}
            >
              <span>{t('contact')}</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: 1,
                  background: 'var(--marble)',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'center',
                  transform: mobileOpen
                    ? i === 1 ? 'scaleX(0)' : i === 0 ? 'rotate(45deg) translate(3px, 3px)' : 'rotate(-45deg) translate(3px, -3px)'
                    : 'none'
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-[rgba(255,255,255,0.05)]"
            style={{ background: 'rgba(9,9,11,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="container py-6 flex flex-col gap-4">
              {[
                { id: 'fleet', label: t('fleet') },
                { id: 'tours', label: t('tours') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-marble-dim hover:text-marble transition-colors"
                  style={{ fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="flex flex-wrap gap-2 pt-2">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`lang-btn ${l.code === locale ? 'active' : ''}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollTo('contact')}
                className="btn-gold mt-2"
                style={{ alignSelf: 'flex-start' }}
              >
                <span>{t('contact')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative font-body text-marble-dim hover:text-marble transition-colors duration-300 group bg-transparent border-none cursor-pointer"
      style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}
    >
      {children}
      <span
        className="absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 group-hover:w-full"
        style={{ width: 0 }}
      />
    </button>
  )
}
