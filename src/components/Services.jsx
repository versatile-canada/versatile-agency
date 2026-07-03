import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpStagger, staggerChild, viewportOnce } from '../lib/animations'

const services = [
  {
    title: 'Web Design',
    desc: 'Distinctive visual identity and interface design, grounded in your brand and built to convert — not another template with your logo swapped in.',
    accent: '#4C6FFF'
  },
  {
    title: 'Web Development',
    desc: 'Fast, modern builds in React and Tailwind — animated, responsive, and handed off with code you actually own, not a locked page-builder.',
    accent: '#A855F7'
  },
  {
    title: 'Brand & Motion',
    desc: 'Logo, type system, and the small interaction details — hover states, scroll reveals, page transitions — that make a site feel considered.',
    accent: '#FF4FA3'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div variants={fadeUpStagger()} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-xl mb-16">
          <motion.span variants={staggerChild} className="block font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-dim mb-4">
            What We Do
          </motion.span>
          <motion.h2 variants={staggerChild} className="font-display font-semibold text-[2rem] lg:text-[2.6rem] tracking-tight leading-[1.15]">
            Design and development, under one roof.
          </motion.h2>
        </motion.div>

        <motion.div variants={fadeUpStagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div key={s.title} variants={staggerChild} className="glass rounded-2xl p-8">
              <div
                className="w-10 h-10 rounded-lg mb-7"
                style={{ background: `linear-gradient(135deg, ${s.accent}, transparent)` }}
              />
              <h3 className="font-display font-semibold text-[18px] mb-3">{s.title}</h3>
              <p className="text-[14px] text-ink-dim leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
