import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpStagger, staggerChild, viewportOnce } from '../lib/animations'

const projects = [
  {
    name: 'Apex Elite Plumbing',
    category: 'Landing Page · Booking System',
    desc: 'A premium, conversion-focused landing page with an animated hero and live appointment booking for a Toronto plumbing company.',
    gradient: 'linear-gradient(135deg, #4C6FFF, #22D3EE)'
  },
  {
    name: 'Your Next Project',
    category: 'Case Study Placeholder',
    desc: 'Swap this card for a real project — screenshot, name, category, and a one-line result once it ships.',
    gradient: 'linear-gradient(135deg, #A855F7, #FF4FA3)'
  },
  {
    name: 'Your Next Project',
    category: 'Case Study Placeholder',
    desc: 'A second open slot for portfolio work — keep it to your strongest 3–6 pieces rather than everything you\'ve shipped.',
    gradient: 'linear-gradient(135deg, #FF4FA3, #4C6FFF)'
  }
]

export default function Work() {
  return (
    <section id="work" className="py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div variants={fadeUpStagger()} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-xl mb-16">
          <motion.span variants={staggerChild} className="block font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-dim mb-4">
            Selected Work
          </motion.span>
          <motion.h2 variants={staggerChild} className="font-display font-semibold text-[2rem] lg:text-[2.6rem] tracking-tight leading-[1.15]">
            A few things we've shipped.
          </motion.h2>
        </motion.div>

        <motion.div variants={fadeUpStagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div key={i} variants={staggerChild} className="glass rounded-2xl overflow-hidden group">
              <div className="h-40 relative overflow-hidden">
                <div className="absolute inset-0 opacity-70" style={{ background: p.gradient }} />
                <div className="absolute inset-0 bg-void/20" />
              </div>
              <div className="p-7">
                <span className="block font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-dim mb-2">{p.category}</span>
                <h3 className="font-display font-semibold text-[17px] mb-2">{p.name}</h3>
                <p className="text-[13.5px] text-ink-dim leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
