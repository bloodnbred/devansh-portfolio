import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { milestones } from '@/data/site'
import { Counter } from '@/components/Counter'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/** Card with pointer-driven 3D tilt, as on the original build. */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node || e.pointerType === 'touch') return
    const r = node.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    node.style.transform = `perspective(900px) translateY(-4px) rotateX(${py * -4}deg) rotateY(${px * 4}deg)`
  }

  const onLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.transform = 'perspective(900px) translateY(0) rotateX(0) rotateY(0)'
    setHover(false)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={onLeave}
      className="group w-full max-w-md border border-cream/12 bg-ink p-6 transition-colors duration-500 hover:border-lime/40 md:p-8"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.25s ease-out' }}
      data-hovered={hover}
    >
      {children}
    </div>
  )
}

export function Journey() {
  const rail = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rail.current
    if (!el || prefersReducedMotion()) return

    const cards = el.querySelectorAll<HTMLElement>('[data-milestone]')
    const progress = el.querySelector<HTMLElement>('[data-progress]')

    const ctx = gsap.context(() => {
      // The spine fills as you travel down it.
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
          },
        )
      }

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          },
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" className="relative border-t border-cream/10 py-[clamp(6rem,14vh,11rem)]">
      <div className="shell">
        <div className="mb-[clamp(3rem,8vh,6rem)]">
          <p className="eyebrow">04 — Journey</p>
          <h2 className="display mt-5 text-(length:--text-mega)">
            Academic
            <br />
            <span className="text-lime">progress</span>
          </h2>
        </div>

        <div ref={rail} className="relative">
          {/* Spine — desktop centre, mobile left rail */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-cream/12 md:left-1/2 md:-translate-x-1/2">
            <div data-progress className="h-full w-full origin-top scale-y-0 bg-linear-to-b from-lime to-orange" />
          </div>

          <div className="space-y-16 md:space-y-28">
            {milestones.map((m, i) => {
              const left = m.side === 'left'
              return (
                <div
                  key={m.id}
                  className="relative pl-8 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
                >
                  {/* Node */}
                  <span className="absolute top-2 left-0 z-10 flex size-2.5 -translate-x-[0.3125rem] items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <span className="absolute size-2.5 rounded-full bg-lime" />
                    <span className="absolute size-6 animate-ping rounded-full bg-lime/25" />
                  </span>

                  <div className={cn('md:flex', left ? 'md:justify-start' : 'md:justify-end')}>
                    <TiltCard>
                      <div data-milestone className="flex items-baseline justify-between">
                        <p className="font-mono text-[0.62rem] tracking-[0.2em] text-lime uppercase">
                          Milestone {String(i + 1).padStart(2, '0')}
                        </p>
                        {m.subtitle && (
                          <p className="font-mono text-[0.58rem] tracking-[0.15em] text-fog/50 uppercase">
                            {m.subtitle}
                          </p>
                        )}
                      </div>

                      <h3 className="display mt-4 text-[clamp(1.6rem,3.4vw,2.6rem)]">{m.title}</h3>

                      <p className="display mt-1 text-[clamp(2rem,4.5vw,3.4rem)] text-lime">
                        <Counter
                          value={m.numericScore}
                          decimals={m.id === 'btech' ? 1 : 0}
                          prefix={m.prefix}
                          suffix={m.suffix}
                        />
                      </p>

                      <p className="mt-4 border-t border-cream/10 pt-4 text-(length:--text-body) text-cream/65">
                        {m.institution}
                      </p>
                    </TiltCard>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}