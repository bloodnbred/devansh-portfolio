import { useEffect, useRef, useState } from 'react'
import { projects, type Project } from '@/data/site'
import { ProjectDetail } from '@/components/ProjectDetail'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { useIsDesktop } from '@/lib/useMedia'
import { cn } from '@/lib/utils'

/**
 * The centrepiece. On desktop this is a pinned horizontal track: the section
 * pins and the panel rail translates horizontally as you scroll vertically.
 * On touch / narrow viewports it degrades to a native horizontal snap rail,
 * because pinned horizontal scroll is exactly where these layouts break on
 * phones.
 */
export function Projects() {
  const section = useRef<HTMLElement>(null)
  const railWrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Project | null>(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const wrap = railWrap.current
    const rail = track.current
    if (!wrap || !rail || !isDesktop || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', rail)
      if (!panels.length) return

      // The rail wrapper is the pin target: it is exactly 100svh, so pinning
      // it locks a clean full-height stage. Distance = rail width - viewport.
      const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth)

      const scrub = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Per-panel depth. containerAnimation is required here: these panels are
      // children of a horizontally transformed element, so a normal vertical
      // trigger would fire on the wrong axis.
      panels.forEach((panel) => {
        const inner = panel.querySelector('[data-panel-inner]')
        if (!inner) return

        gsap.fromTo(
          inner,
          { yPercent: 6, opacity: 0.45 },
          {
            yPercent: -6,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrub,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    }, wrap)

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <section id="work" ref={section} className="relative">
      {/* Header sits OUTSIDE the pin. If the heading were inside the pinned
          element the pinned block would be taller than the viewport and the
          rail would be pushed below the fold. */}
      <div className="shell pt-[clamp(5rem,12vh,9rem)] pb-[clamp(3rem,7vh,5rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">02 — Selected Work</p>
            <h2 className="display mt-5 text-(length:--text-mega)">
              Projects<span className="text-lime">.</span>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[0.7rem] leading-relaxed tracking-[0.05em] text-fog/60">
            {isDesktop
              ? 'Scroll to advance — each project opens into a full walkthrough.'
              : 'Swipe to advance — tap any project for the full walkthrough.'}
          </p>
        </div>
      </div>

      {/* Desktop: pinned rail. Mobile: snap rail. Same markup, both usable. */}
      <div
        ref={isDesktop ? railWrap : undefined}
        className={cn(
          isDesktop && 'h-[100svh] overflow-hidden',
          !isDesktop && 'snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-6',
        )}
      >
        <div
          ref={track}
          className={cn(
            'flex',
            isDesktop
              ? 'h-[100svh] w-max items-stretch lg:flex-row'
              : 'w-max snap-x snap-mandatory',
          )}
        >
          {projects.map((p, i) => (
            <article
              key={p.id}
              data-panel
              className={cn(
                'group relative shrink-0',
                isDesktop
                  ? 'flex h-full w-[min(92vw,68rem)] items-center px-[6vw]'
                  // Card padding eats into the panel, so the panel has to be
                  // wider than the visible card or long titles clip.
                  : 'w-[90vw] snap-center px-[3vw]',
              )}
            >
              <div
                data-panel-inner
                className={cn(
                  'w-full',
                  isDesktop && 'max-w-[52rem]',
                )}
                onClick={() => setActive(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(p)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${p.title} case study`}
              >
                <div className="relative overflow-hidden border border-cream/12 bg-ink p-[clamp(1.5rem,3.5vw,3.25rem)] transition-colors duration-500 hover:border-lime/50">
                  {/* Index + status */}
                  <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.2em] uppercase">
                    <span className="text-lime">
                      {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                    <span className="flex items-center gap-2 text-fog/50">
                      <span className="inline-block size-1 bg-lime" />
                      {p.featured ? 'Featured' : 'Case study'}
                    </span>
                  </div>

                  <h3 className="display mt-[clamp(1.5rem,3vw,2.5rem)] text-[clamp(1.75rem,5.5vw,4.5rem)] break-words transition-transform duration-700 group-hover:translate-x-2">
                    {p.title}
                  </h3>

                  <p className="mt-2 font-mono text-[0.68rem] tracking-[0.18em] text-lime/80 uppercase">
                    {p.subtitle}
                  </p>

                  <p className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-xl text-(length:--text-lg) leading-relaxed text-cream/70">
                    {p.blurb}
                  </p>

                  {/* Tags */}
                  <ul className="mt-[clamp(1.5rem,3vw,2.5rem)] flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="border border-cream/15 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.1em] text-cream/65 uppercase transition-colors duration-300 group-hover:border-lime/40 group-hover:text-lime"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Open affordance */}
                  <div className="mt-[clamp(1.5rem,3vw,2.5rem)] flex items-center gap-3 font-mono text-[0.65rem] tracking-[0.2em] uppercase">
                    <span className="relative h-px w-10 bg-cream/30 transition-all duration-500 group-hover:w-16 group-hover:bg-lime">
                      <span className="absolute inset-y-0 -left-px w-px bg-cream/30" />
                    </span>
                    <span className="text-cream/60 transition-colors duration-500 group-hover:text-lime">
                      View walkthrough
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Rail end-cap so the last panel isn't flush against the edge */}
          <div className={cn(isDesktop ? 'w-[20vw] shrink-0' : 'w-6 shrink-0')} aria-hidden />
        </div>
      </div>

      {/* Mobile hint */}
      {!isDesktop && (
        <p className="shell mt-2 font-mono text-[0.62rem] tracking-[0.2em] text-fog/45 uppercase">
          ← swipe →
        </p>
      )}

      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </section>
  )
}