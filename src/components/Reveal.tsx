import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  /** Direction the content travels from. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  className?: string
  /** Render as a block-level wrapper. */
  block?: boolean
}

/** Scroll-triggered entrance. The workhorse for every section. */
export function Reveal({ children, from = 'up', delay = 0, duration = 0.9, className, block = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const fromVars: gsap.TweenVars = {
      up: { y: 44, opacity: 0 },
      down: { y: -44, opacity: 0 },
      left: { x: 56, opacity: 0 },
      right: { x: -56, opacity: 0 },
      none: { opacity: 0 },
    }[from]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { ...fromVars, filter: from === 'none' ? 'blur(6px)' : 'blur(0px)' },
        {
          x: 0,
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [from, delay, duration])

  return (
    <div ref={ref} className={cn(block && 'block', className)}>
      {children}
    </div>
  )
}

/**
 * Wraps children in an image-reveal mask — clip-path ellipse expanding from
 * the top, as used on the hero portrait and project panels.
 */
export function RevealMask({
  children,
  className,
  delay = 0,
  from = 'top',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  from?: 'top' | 'center' | 'bottom'
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const origin = from === 'center' ? '50% 50%' : from === 'bottom' ? '50% 100%' : '50% 0%'
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: `ellipse(0% 0% at 50% ${from === 'top' ? '0%' : from === 'bottom' ? '100%' : '50%'})` },
        {
          clipPath: `ellipse(150% 120% at ${origin})`,
          duration: 1.4,
          delay,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [delay, from])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}