import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

type Props = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

/** Count-up that fires once the element scrolls into view. */
export function Counter({ value, decimals = 0, prefix = '', suffix = '', className }: Props) {
  const el = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = el.current
    if (!node) return

    const write = (v: number) => {
      node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
    }

    if (prefersReducedMotion()) {
      write(value)
      return
    }

    const state = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(state, {
        v: value,
        duration: 1.6,
        ease: 'power3.out',
        onUpdate: () => write(state.v),
        scrollTrigger: { trigger: node, start: 'top 90%' },
      })
    }, node)

    return () => ctx.revert()
  }, [value, decimals, prefix, suffix])

  return (
    <span ref={el} className={cn('tabular-nums', className)}>
      {`${prefix}0${suffix}`}
    </span>
  )
}