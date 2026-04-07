'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useActionState } from 'react'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'it', label: 'Italiano' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
]

const initialState: ContactFormState = {}

export function ContactSection() {
  const t = useTranslations('contact')
  const tf = useTranslations('contact.form')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [state, action, pending] = useActionState(submitContactForm, initialState)

  return (
    <section id="contact" className="section relative overflow-hidden bg-obsidian">
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 60% at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container relative" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Copy */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="badge">{t('badge')}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-marble mb-6"
              style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 300 }}
            >
              {t('title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-marble-dim mb-10"
              style={{ fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}
            >
              {t('subtitle')}
            </motion.p>

            {/* Security features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              {[
                { icon: '🔐', text: 'End-to-end encrypted' },
                { icon: '🚫', text: 'No public database storage' },
                { icon: '⚡', text: 'Response within 2 hours' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span
                    className="font-body text-marble-dim"
                    style={{ fontSize: 13, fontWeight: 300 }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 pt-8 border-t border-[rgba(255,255,255,0.06)]"
            >
              <p
                className="font-body text-marble-dim"
                style={{ fontSize: 11, letterSpacing: '0.05em', lineHeight: 1.6 }}
              >
                {t('privacy')}
              </p>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="glass-card p-8 md:p-10"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <AnimatePresence mode="wait">
                {state.success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: 'var(--gold-dim)',
                        border: '1px solid var(--gold-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 24,
                        fontSize: 28,
                      }}
                    >
                      ✓
                    </div>
                    <h3
                      className="font-display text-marble mb-3"
                      style={{ fontSize: 28, fontWeight: 300 }}
                    >
                      Thank you
                    </h3>
                    <p className="font-body text-marble-dim" style={{ fontSize: 14, lineHeight: 1.7 }}>
                      {tf('success')}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    action={action}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Honeypot field — hidden from real users */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="form-label">
                        {tf('name')}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        placeholder={tf('namePlaceholder')}
                        className="form-input"
                        autoComplete="name"
                      />
                      {state.fieldErrors?.name && (
                        <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>
                          {state.fieldErrors.name[0]}
                        </p>
                      )}
                    </div>

                    {/* Language + Date grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-language" className="form-label">
                          {tf('language')}
                        </label>
                        <select
                          id="contact-language"
                          name="language"
                          required
                          className="form-input"
                          style={{ appearance: 'none', cursor: 'pointer' }}
                        >
                          {LANGUAGES.map((l) => (
                            <option key={l.code} value={l.code} style={{ background: '#111115' }}>
                              {l.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="contact-date" className="form-label">
                          {tf('date')}
                        </label>
                        <input
                          id="contact-date"
                          name="date"
                          type="date"
                          required
                          className="form-input"
                          style={{ colorScheme: 'dark' }}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {state.fieldErrors?.date && (
                          <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>
                            {state.fieldErrors.date[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <label htmlFor="contact-info" className="form-label">
                        {tf('contact')}
                      </label>
                      <input
                        id="contact-info"
                        name="contact"
                        type="text"
                        required
                        maxLength={200}
                        placeholder={tf('contactPlaceholder')}
                        className="form-input"
                        autoComplete="tel"
                      />
                      {state.fieldErrors?.contact && (
                        <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>
                          {state.fieldErrors.contact[0]}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="form-label">
                        {tf('message')}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        maxLength={1000}
                        placeholder={tf('messagePlaceholder')}
                        className="form-input"
                        style={{ resize: 'vertical', minHeight: '100px' }}
                      />
                    </div>

                    {/* Error message */}
                    {state.error && !state.fieldErrors && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-body"
                        style={{ color: '#f87171', fontSize: 13 }}
                      >
                        {tf('error')}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={pending}
                      className="btn-gold"
                      style={{ opacity: pending ? 0.7 : 1, cursor: pending ? 'wait' : 'pointer' }}
                    >
                      <span>{pending ? tf('submitting') : tf('submit')}</span>
                      {!pending && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
