'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const REVIEWS = [
  {
    name: "Alex V.",
    text: "Impeccable service. The vehicle was immaculate and our driver was perfectly punctual and professional. The only way to travel in Santorini.",
  },
  {
    name: "Sarah M.",
    text: "Used them for our airport transfer and a sunset tour to Oia. Communication was seamless via WhatsApp. Highly recommended.",
  },
  {
    name: "Michael T.",
    text: "Truly a premium experience. They knew the best times to avoid traffic and made our anniversary trip completely stress-free.",
  }
]

export function ReviewsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section bg-obsidian-2 relative border-t border-[rgba(255,255,255,0.03)] py-24" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge mb-5">Social Proof</span>
          <h2 className="font-display text-marble" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300 }}>
            Client Experiences
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
              className="glass-card p-8 flex flex-col items-center text-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="16" height="16" viewBox="0 0 20 20" fill="var(--gold)">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-marble-dim mb-8 flex-grow" style={{ fontSize: 14, lineHeight: 1.7, fontStyle: 'italic' }}>
                "{review.text}"
              </p>
              <div className="font-body text-marble" style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {review.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
