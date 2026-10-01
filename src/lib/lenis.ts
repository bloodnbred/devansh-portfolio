import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

let lenisInstance: Lenis | null = null

/**
 * Lenis drives the scroll, ScrollTrigger reads it. Without this bridge the two
 * fight and pinned sections drift.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
    })
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Images and fonts landing late is the classic cause of a mis-anchored
    // pinned section. Re-measure once everything is decoded.
    const remeasure = () => ScrollTrigger.refresh()
    window.addEventListener('load', remeasure)

    return () => {
      window.removeEventListener('load', remeasure)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}

export function scrollTo(target: string | HTMLElement, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth' })
}

export function stopScroll() {
  lenisInstance?.stop()
}

export function startScroll() {
  lenisInstance?.start()
}

export function lockScroll(locked: boolean) {
  if (locked) {
    lenisInstance?.stop()
    document.body.style.overflow = 'hidden'
  } else {
    lenisInstance?.start()
    document.body.style.overflow = ''
  }
}