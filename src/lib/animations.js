export const easeGlass = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeGlass } }
}

export const fadeUpStagger = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } }
})

export const staggerChild = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeGlass } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeGlass } }
}

export const buttonTap = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 18 } },
  tap: { scale: 0.97 }
}

export const viewportOnce = { once: true, margin: '-80px' }
