'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

const TOURS = [
  {
    key: 'tour1',
    image: '/tour-caldera.png',
    alt: 'Santorini Caldera panoramic view at sunset',
    id: 'tour-caldera-card',
  },
  {
    key: 'tour2',
    image: '/tour-oia.png',
    alt: 'Oia village sunset with iconic windmills',
    id: 'tour-oia-card',
  },
]

export function ToursSection() {
  const t = useTranslations('tours')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tours" className="section relative overflow-hidden bg-obsidian-2">
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="badge">{t('badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-marble mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300 }}
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-marble-dim max-w-lg mx-auto"
            style={{ fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Tour Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {TOURS.map((tour, i) => (
            <TourCard key={tour.key} tour={tour} index={i} inView={inView} />
          ))}
        </div>

        {/* Custom Tours */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 lg:mt-16 bg-[rgba(20,20,25,0.6)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden backdrop-blur-sm"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(201,168,76,0.03)] to-transparent pointer-events-none" />
          
          <h3 className="font-display text-marble mb-4 relative z-10" style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 300 }}>
            {t('custom.title')}
          </h3>
          <p className="font-body text-marble-dim max-w-2xl mx-auto mb-8 relative z-10" style={{ fontSize: 14, lineHeight: 1.8 }}>
            {t('custom.description')}
          </p>
          
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-gold mx-auto relative z-10"
            style={{ padding: '12px 32px' }}
          >
            <span>{t('custom.cta')}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-2" style={{ display: 'inline-block' }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function TourCard({
  tour,
  index,
  inView,
}: {
  tour: (typeof TOURS)[0]
  index: number
  inView: boolean
}) {
  const t = useTranslations(`tours.${tour.key}`)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      id={tour.id}
      className="tour-card"
      style={{ height: '520px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '16px' }}>
        <Image
          src={tour.image}
          alt={tour.alt}
          fill
          quality={85}
          className="tour-card-img"
          style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Overlay */}
      <div className="tour-card-overlay" />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px',
          zIndex: 2,
        }}
      >
        {/* Duration & Stops badges */}
        <div className="flex gap-2 mb-4">
          <span
            className="font-body"
            style={{
              display: 'inline-flex',
              padding: '4px 12px',
              borderRadius: '100px',
              border: '1px solid var(--gold-border)',
              background: 'var(--gold-dim)',
              color: 'var(--gold-2)',
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {t('duration')}
          </span>
          <span
            className="font-body"
            style={{
              display: 'inline-flex',
              padding: '4px 12px',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.06)',
              color: 'var(--marble-dim)',
              fontSize: 10,
              letterSpacing: '0.05em',
            }}
          >
            {t('stops')}
          </span>
        </div>

        <h3
          className="font-display text-marble mb-3"
          style={{ fontSize: 32, fontWeight: 300, lineHeight: 1.1 }}
        >
          {t('title')}
        </h3>

        <motion.p
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="font-body text-marble-dim mb-6"
          style={{ fontSize: 13, lineHeight: 1.7, fontWeight: 300 }}
        >
          {t('description')}
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <button
            className="btn-ghost"
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{ fontSize: 11 }}
          >
            {t('cta')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
