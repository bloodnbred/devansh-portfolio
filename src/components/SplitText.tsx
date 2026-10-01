import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

type Props = {
  text: string
  /** Per-character stagger. */
  stagger?: number
  /** 'lines' masks each char inside a clip band — the brand reveal. */
  variant?: 'chars' | 'fade'
  delay?: number
  start?: string
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3'
  className?: string
}

/**
 * Splits text into per-character spans and reveals them with a polygon mask.
 * Respects reduced motion by simply rendering the text.
 */
export function SplitText({
  text,
  stagger = 0.022,
  variant = 'chars',
  delay = 0,
  start = 'top 85%',
  as: Tag = 'span',
  className,
}: Props) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const chars = el.querySelectorAll<HTMLElement>('[data-char]')
    if (!chars.length) return

    if (prefersReducedMotion()) {
      gsap.set(chars, { clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      if (variant === 'chars') {
        gsap.set(chars, {
          yPercent: 118,
          rotate: 4,
          transformOrigin: '50% 100%',
        })
        gsap.to(chars, {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          delay,
          ease: 'power4.out',
          stagger,
          scrollTrigger: { trigger: el, start },
        })
      } else {
        gsap.set(chars, { opacity: 0, y: 14, filter: 'blur(6px)' })
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          delay,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: el, start },
        })
      }
    }, el)

    return () => ctx.revert()
  }, [text, stagger, variant, delay, start])

  return (
    <Tag ref={root as never} className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.split('').map((c, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-char className="inline-block will-change-transform">
              {c === ' ' ? '\u00A0' : c}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  )
}