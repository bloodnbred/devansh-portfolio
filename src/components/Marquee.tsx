import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  items: readonly string[]
  direction?: 'left' | 'right'
  /** Seconds for one full pass. */
  duration?: number
  className?: string
  separator?: string
}

/**
 * Infinite marquee. Speed is tied to scroll velocity via the CSS custom
 * properties --marquee-duration and --marquee-shift, so scrolling scrubs the
 * ticker rather than just running it past you.
 */
export function Marquee({ items, direction = 'left', duration = 26, className, separator = '·' }: Props) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return

    const setDuration = () => {
      el.style.setProperty('--marquee-duration', `${duration}s`)
    }
    setDuration()
  }, [duration])

  const doubled = [...items, ...items]

  return (
    <div className={cn('group relative flex overflow-hidden', className)} aria-hidden="true">
      <div
        ref={track}
        data-marquee-track
        className={cn(
          'flex w-max shrink-0 items-center gap-[2.5rem] pr-[2.5rem] will-change-transform',
          direction === 'left' ? 'animate-marquee-l' : 'animate-marquee-r',
        )}
      >
        {doubled.map((item, i) => (
          <span key={i} className="display whitespace-nowrap text-[clamp(2rem,6vw,6rem)] text-fog/35 transition-colors duration-500 group-hover:text-lime">
            {item}
            <span className="ml-[2.5rem] text-lime/50">{separator}</span>
          </span>
        ))}
      </div>
      <div
        data-marquee-track
        className={cn(
          'flex w-max shrink-0 items-center gap-[2.5rem] pr-[2.5rem] will-change-transform',
          direction === 'left' ? 'animate-marquee-l' : 'animate-marquee-r',
        )}
      >
        {doubled.map((item, i) => (
          <span key={i} className="display whitespace-nowrap text-[clamp(2rem,6vw,6rem)] text-fog/35 transition-colors duration-500 group-hover:text-lime">
            {item}
            <span className="ml-[2.5rem] text-lime/50">{separator}</span>
          </span>
        ))}
      </div>

      {/* Edge fades — the marquee should enter and leave, not get chopped. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[8vw] bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[8vw] bg-gradient-to-l from-void to-transparent" />
    </div>
  )
}