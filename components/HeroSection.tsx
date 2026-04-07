'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian"
      style={{ paddingTop: '80px' }}
    >
      {/* Background radial gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top subtle line */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4))',
        }}
      />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <span className="badge">
              <span className="pulse-gold" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)' }} />
              {t('badge')}
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-marble"
              style={{ fontSize: 'clamp(52px, 9vw, 108px)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.03em' }}
            >
              {t('title')}
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-gold"
              style={{ fontSize: 'clamp(52px, 9vw, 108px)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.03em', fontStyle: 'italic' }}
            >
              {t('subtitle')}
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.5}
            className="font-body text-marble-dim max-w-md mx-auto mb-12"
            style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 300 }}
          >
            {t('description')}
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.65}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              id="hero-cta-btn"
              className="btn-gold"
              onClick={() => {
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>{t('cta')}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              className="btn-ghost"
              onClick={() => {
                const el = document.getElementById('fleet')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t('scroll')} ↓
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mercedes Image */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full mt-8"
        style={{ maxWidth: '900px', margin: '40px auto 0' }}
      >
        {/* Car glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: '120px',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />
        <Image
          src="/mercedes.png"
          alt="White Mercedes-Benz S-Class — Pep Santorini Premium Transfer"
          width={900}
          height={600}
          priority
          quality={95}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-body text-marble-dim"
          style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          {t('scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
