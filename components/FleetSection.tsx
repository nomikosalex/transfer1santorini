'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const SPECS = [
  { key: 'passengers', icon: '👤' },
  { key: 'luggage', icon: '🧳' },
  { key: 'ac', icon: '❄️' },
  { key: 'wifi', icon: '📡' },
  { key: 'privacy', icon: '🔒' },
] as const

export function FleetSection() {
  const t = useTranslations('fleet')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  }

  return (
    <section id="fleet" className="section relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="gold-line-full mb-0" />

      <div className="container relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image (Hidden on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block relative"
          >
            {/* Decorative border */}
            <div
              style={{
                position: 'absolute',
                top: -20,
                left: -20,
                right: 20,
                bottom: 20,
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '16px',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center bottom, rgba(201,168,76,0.1) 0%, transparent 60%)',
                borderRadius: '12px',
              }}
            />
            <Image
              src="/mercedes.png"
              alt="Luxury Mercedes Transfer Santorini vehicle"
              width={600}
              height={440}
              quality={90}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </motion.div>

          {/* Right: Content */}
          <div className="bg-[rgba(20,20,25,0.4)] lg:bg-transparent border border-[rgba(255,255,255,0.05)] lg:border-none rounded-2xl p-8 lg:p-0 backdrop-blur-sm lg:backdrop-blur-none shadow-2xl lg:shadow-none w-full max-w-4xl mx-auto lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <span className="badge">{t('badge')}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-marble mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300 }}
            >
              {t('title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-body text-marble-dim mb-10"
              style={{ fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}
            >
              {t('subtitle')}
            </motion.p>

            {/* Specs Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10"
            >
              {SPECS.map(({ key }) => {
                const spec = t.raw(`specs.${key}`) as { label: string; value: string }
                return (
                  <motion.div key={key} variants={itemVariants} className="spec-card">
                    <div
                      className="font-body text-gold-2 mb-1"
                      style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}
                    >
                      {spec.label}
                    </div>
                    <div
                      className="font-display text-marble"
                      style={{ fontSize: 18, fontWeight: 300 }}
                    >
                      {spec.value}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col gap-2"
            >
              {(['tag1', 'tag2', 'tag3'] as const).map((tag) => (
                <div key={tag} className="flex items-center gap-3">
                  <div
                    style={{
                      width: 16,
                      height: 1,
                      background: 'var(--gold)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-body text-marble-dim"
                    style={{ fontSize: 13, fontWeight: 300 }}
                  >
                    {t(tag)}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="gold-line-full mt-0" style={{ marginTop: '80px' }} />
    </section>
  )
}
