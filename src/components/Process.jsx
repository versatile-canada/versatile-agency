import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpStagger, staggerChild, viewportOnce } from '../lib/animations'

const steps = [
  {
    n: '01',
    title: 'Discover',
    desc: 'A working session to understand your business, audience, and what the site actually needs to accomplish.'
  },
  {
    n: '02',
    title: 'Design',
    desc: 'A distinctive visual direction built from your brand — reviewed with you before a single line of code is written.'
  },
  {
    n: '03',
    title: 'Build',
    desc: 'Development in React and Tailwind, with the animation and interaction details built in from the start.'
  },
  {
    n: '04',
    title: 'Launch & Support',
    desc: 'Deployed, tested across devices, and handed off with a support window for the first round of real-world feedback.'
  }
]

export default function Process() {
  return (
    <section id="process" className="py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div variants={fadeUpStagger()} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-xl mb-16">
          <motion.span variants={staggerChild} className="block font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-dim mb-4">
            How We Work
          </motion.span>
          <motion.h2 variants={staggerChild} className="font-display font-semibold text-[2rem] lg:text-[2.6rem] tracking-tight leading-[1.15]">
            Four steps, start to launch.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={fadeUpStagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {steps.map((s) => (
            <motion.div key={s.n} variants={staggerChild} className="glass rounded-2xl p-8 flex gap-6">
              <span className="font-display font-semibold text-[15px] text-ink-faint shrink-0 pt-1">{s.n}</span>
              <div>
                <h3 className="font-display font-semibold text-[17px] mb-2">{s.title}</h3>
                <p className="text-[13.5px] text-ink-dim leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
