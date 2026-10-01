import { useEffect, useRef } from 'react'
import { tickerWords } from '@/data/site'
import { Marquee } from '@/components/Marquee'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export function Ticker() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const tracks = el.querySelectorAll<HTMLElement>('[data-marquee-track]')
    if (!tracks.length) return

    const ctx = gsap.context(() => {
      // Nudge the CSS animation speed with scroll velocity so the ticker reads
      // as connected to the scroll rather than running on its own clock.
      let raf = 0
      let last = window.scrollY
      let velocity = 0

      const tick = () => {
        const y = window.scrollY
        velocity = y - last
        last = y
        const boost = gsap.utils.clamp(0.35, 3, 1 + Math.abs(velocity) / 90)
        el.style.setProperty('--marquee-duration', `${26 / boost}s`)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      // Gentle vertical drift as the band crosses the viewport.
      gsap.to(tracks, {
        y: (i) => (i % 2 === 0 ? -18 : 18),
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      return () => cancelAnimationFrame(raf)
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative border-y border-cream/10 py-6">
      <Marquee items={tickerWords} direction="left" duration={26} />
      <div className="mt-2 opacity-45">
        <Marquee items={tickerWords} direction="right" duration={34} />
      </div>
    </div>
  )
}