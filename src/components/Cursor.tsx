import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useIsTouch } from '@/lib/useMedia'

/**
 * Lerped custom cursor. Desktop + fine pointer only; touch and
 * reduced-motion users get the native cursor back.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  const isTouch = useIsTouch()

  useEffect(() => {
    if (isTouch || prefersReducedMotion()) return

    // Confirm a real mouse is actually in play before hiding the native one.
    const onFirstMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') setEnabled(true)
    }
    window.addEventListener('pointermove', onFirstMove, { once: true })
    return () => window.removeEventListener('pointermove', onFirstMove)
  }, [isTouch])

  useEffect(() => {
    if (!enabled) return
    document.body.dataset.cursor = 'custom'

    const d = dot.current
    const r = ring.current
    if (!d || !r) return

    const dx = gsap.quickTo(d, 'x', { duration: 0.12, ease: 'power3.out' })
    const dy = gsap.quickTo(d, 'y', { duration: 0.12, ease: 'power3.out' })
    const rx = gsap.quickTo(r, 'x', { duration: 0.55, ease: 'power3.out' })
    const ry = gsap.quickTo(r, 'y', { duration: 0.55, ease: 'power3.out' })

    let scale = 1
    const setScale = gsap.quickSetter(r, 'scale')

    const onMove = (e: PointerEvent) => {
      dx(e.clientX)
      dy(e.clientY)
      rx(e.clientX)
      ry(e.clientY)
    }

    // Grow + invert over anything interactive.
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null
      const interactive = t?.closest('a, button, [data-cursor="grow"], input, [role="button"]')
      const onImage = t?.closest('[data-cursor="blend"]')
      scale = interactive || onImage ? 2.6 : 1
      setScale(scale)
      gsap.to(r, {
        borderColor: interactive ? 'rgb(210 255 0)' : 'rgb(244 244 237 / 0.6)',
        backgroundColor: interactive ? 'rgb(210 255 0 / 0.16)' : 'rgb(244 244 237 / 0)',
        duration: 0.35,
      })
    }

    const onDown = () => setScale(scale * 0.72)
    const onUp = () => setScale(scale)
    const onLeave = () => gsap.to([d, r], { opacity: 0, duration: 0.25 })

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      delete document.body.dataset.cursor
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ring} className="pointer-events-none fixed top-0 left-0 z-[9998] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/60 mix-blend-difference will-change-transform" />
      <div ref={dot} className="pointer-events-none fixed top-0 left-0 z-[9999] size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime will-change-transform" />
    </>
  )
}

/** Page-level scroll progress rail. */
export function ProgressBar() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = bar.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left">
      <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-linear-to-r from-lime to-orange" />
    </div>
  )
}