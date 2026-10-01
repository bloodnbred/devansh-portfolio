import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

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