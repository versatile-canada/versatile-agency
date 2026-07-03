import React from 'react'
import { motion } from 'framer-motion'
import BlobField from './BlobField'
import { fadeUpStagger, staggerChild, buttonTap } from '../lib/animations'

export default function Hero() {
  return (
    <section id="top" className="relative pt-44 pb-28 lg:pt-52 lg:pb-36 overflow-hidden">
      <BlobField />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div variants={fadeUpStagger()} initial="hidden" animate="show">
          <motion.span
            variants={staggerChild}
            className="inline-flex items-center gap-2 rounded-full glass-subtle px-4 py-1.5 font-mono text-[11.5px] tracking-[0.1em] uppercase text-ink-dim mb-8"
          >
            Web Design &amp; Development Studio
          </motion.span>

          <motion.h1
            variants={staggerChild}
            className="font-display font-semibold text-[2.6rem] leading-[1.08] sm:text-[3.6rem] lg:text-[4.6rem] tracking-tight mb-8"
          >
            We build websites
            <br />
            that feel <span className="text-gradient">alive.</span>
          </motion.h1>

          <motion.p
            variants={staggerChild}
            className="text-[17px] lg:text-[19px] text-ink-dim leading-relaxed max-w-xl mx-auto mb-11"
          >
            Versatile is a small studio designing and building fast, distinctive
            websites for brands that refuse to look like a template.
          </motion.p>

          <motion.div variants={staggerChild} className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="#contact"
              variants={buttonTap}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-4 text-[14.5px] font-semibold text-void"
            >
              Start a Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </motion.a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl glass px-7 py-4 text-[14.5px] font-medium text-ink"
            >
              See Our Work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
