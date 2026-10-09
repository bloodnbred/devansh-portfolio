import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Re-exported from its own module so the ~15 components that gate their
// timelines on it don't have to know the flag also honours a dev override.
export { prefersReducedMotion } from './motion'

/**
 * Viewport breakpoints. The pinned horizontal track and the large display type
 * are the two things that break on phones — sections branch on these rather
 * than on raw user-agent sniffing.
 */
export const bp = {
  desktop: '(min-width: 1024px)',
  tablet: '(min-width: 768px)',
  mobile: '(max-width: 767px)',
  pointerFine: '(pointer: fine)',
} as const

export { gsap, ScrollTrigger }