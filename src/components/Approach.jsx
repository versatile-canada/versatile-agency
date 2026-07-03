import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpStagger, staggerChild, viewportOnce } from '../lib/animations'

const values = [
  { title: 'No page builders', desc: 'Every site is hand-coded — you own clean, portable code, not a locked account on someone else\'s platform.' },
  { title: 'Small by design', desc: 'A small studio means direct access to the people actually designing and building your site, every time.' },
  { title: 'Built to be found', desc: 'Fast load times and clean markup from day one — performance isn\'t a phase-two conversation.' }
]

export default function Approach() {
  return (
    <section className="py-28 lg:py-36 border-y border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div variants={fadeUpStagger()} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-xl mb-16">
          <motion.span variants={staggerChild} className="block font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-dim mb-4">
            Why Versatile
          </motion.span>
          <motion.h2 variants={staggerChild} className="font-display font-semibold text-[2rem] lg:text-[2.6rem] tracking-tight leading-[1.15]">
            The way we work is the pitch.
          </motion.h2>
        </motion.div>

        <motion.div variants={fadeUpStagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <motion.div key={v.title} variants={staggerChild}>
              <h3 className="font-display font-semibold text-[17px] mb-3">{v.title}</h3>
              <p className="text-[14px] text-ink-dim leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
