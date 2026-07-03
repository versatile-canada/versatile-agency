import React from 'react'
import { motion } from 'framer-motion'
import BlobField from './BlobField'
import { fadeUp, viewportOnce, buttonTap } from '../lib/animations'

export default function CTA() {
  return (
    <section id="contact" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <BlobField />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="glass rounded-[28px] px-8 py-16 lg:px-16 lg:py-20 text-center"
        >
          <h2 className="font-display font-semibold text-[2rem] lg:text-[2.8rem] tracking-tight leading-[1.12] mb-6">
            Have a project in mind?
          </h2>
          <p className="text-[16px] lg:text-[17px] text-ink-dim leading-relaxed max-w-lg mx-auto mb-10">
            Tell us what you're building and we'll get back to you within one
            business day with next steps.
          </p>
          <motion.a
            href="mailto:hello@versatile.agency"
            variants={buttonTap}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-8 py-4 text-[15px] font-semibold text-void"
          >
            hello@versatile.agency
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
