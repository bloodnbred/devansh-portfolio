import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { identity } from '@/data/site'

/**
 * Mask-wipe preloader with a real 0→100 counter.
 * Calls `onDone` when finished so the hero can start its own timeline.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    const num = counter.current
    if (!el || !num) return

    if (prefersReducedMotion()) {
      const t = setTimeout(onDone, 200)
      return () => clearTimeout(t)
    }

    const state = { v: 0 }
    const tl = gsap.timeline({ onComplete: onDone })

    tl.to(state, {
      v: 100,
      duration: 1.9,
      ease: 'power2.inOut',
      onUpdate: () => {
        num.textContent = String(Math.round(state.v)).padStart(3, '0')
      },
    })
      // Name slides up and out from behind the mask, then the mask itself lifts.
      .to('[data-pre-name]', { yPercent: -115, duration: 0.8, ease: 'power4.inOut' }, '-=0.15')
      .to(el, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' }, '-=0.35')

    return () => {
      tl.kill()
    }
  }, [onDone])

  return (
    <div ref={root} className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-lime text-void">
      <div className="shell flex items-start justify-between pt-[calc(var(--nav-h)/1.6)]">
        <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">Loading</span>
        <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">
          {identity.institution}
        </span>
      </div>

      <div className="shell flex flex-col gap-2 pb-[6vh]">
        <span data-pre-name className="display text-[clamp(3rem,13vw,12rem)] leading-[0.85]">
          {identity.last}
        </span>
        <span data-pre-name className="display text-[clamp(3rem,13vw,12rem)] leading-[0.85]">
          {identity.first}
        </span>
        <div className="mt-4 flex items-end justify-between border-t border-void/25 pt-4">
          <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">
            Software Developer
          </span>
          <span ref={counter} className="display text-[clamp(1.6rem,4vw,3.4rem)] tabular-nums">
            000
          </span>
        </div>
      </div>
    </div>
  )
}