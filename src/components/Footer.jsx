import React from 'react'

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6 flex flex-wrap items-center justify-between gap-4">
        <span className="font-display font-semibold text-[15px]">Versatile</span>
        <div className="flex items-center gap-6 text-[13px] text-ink-dim">
          <a href="#work" className="hover:text-ink transition-colors">Work</a>
          <a href="#services" className="hover:text-ink transition-colors">Services</a>
          <a href="#contact" className="hover:text-ink transition-colors">Contact</a>
        </div>
        <p className="text-[12px] text-ink-faint">© 2026 Versatile. All rights reserved.</p>
      </div>
    </footer>
  )
}
