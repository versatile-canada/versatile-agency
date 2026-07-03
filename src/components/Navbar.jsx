import React from 'react'
import { motion } from 'framer-motion'
import { buttonTap } from '../lib/animations'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' }
]

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-6 pt-5">
        <div className="glass rounded-2xl px-5 lg:px-6 h-[64px] flex items-center justify-between">
          <a href="#top" className="font-display font-semibold text-[17px] tracking-tight text-ink">
            Versatile
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-[13.5px] text-ink-dim hover:text-ink transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </nav>

          <motion.a
            href="#contact"
            variants={buttonTap}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 lg:px-5 py-2.5 text-[13px] font-semibold text-void"
          >
            Start a Project
          </motion.a>
        </div>
      </div>
    </header>
  )
}
