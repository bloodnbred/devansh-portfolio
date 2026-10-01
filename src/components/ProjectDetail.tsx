import { useEffect, useRef } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/site'
import { lockScroll } from '@/lib/lenis'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Full-screen case study. Renders the six-stage content extracted from the
 * original build: problem → architecture → flow → features → stack → live link.
 */
export function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lockScroll(Boolean(project))

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [project, onClose])

  useEffect(() => {
    const el = panel.current
    if (!el || !project) return

    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(
        '[data-detail-root]',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.inOut' },
      ).fromTo(
        '[data-detail-stage]',
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out' },
        '-=0.3',
      )
    }, el)

    return () => ctx.revert()
  }, [project])

  if (!project) return null

  const liveLink = project.stages.find((s) => s.type === 'tryit')

  return (
    <div
      className="fixed inset-0 z-[150] overflow-y-auto overscroll-contain bg-void"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div ref={panel} data-detail-root className="min-h-full">
        {/* Sticky header */}
        <header className="sticky top-0 z-20 border-b border-cream/10 bg-void/85 backdrop-blur-xl">
          <div className="shell flex h-[var(--nav-h)] items-center justify-between">
            <div>
              <p className="eyebrow">Case study</p>
              <p className="mt-0.5 font-mono text-[0.68rem] tracking-[0.15em] text-fog/60 uppercase">
                {project.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex size-11 items-center justify-center border border-cream/15 transition-colors hover:border-lime hover:text-lime"
              aria-label="Close case study"
            >
              <X className="size-5" />
            </button>
          </div>
        </header>

        {/* Title block */}
        <div className="shell pt-[clamp(3rem,8vh,6rem)] pb-[clamp(3rem,7vh,5rem)]">
          <div data-detail-stage>
            <h2 className="display text-[clamp(2.25rem,7vw,6rem)]">{project.title}</h2>
            <p className="mt-3 font-mono text-[0.75rem] tracking-[0.18em] text-lime uppercase">
              {project.subtitle}
            </p>
            <p className="mt-8 max-w-2xl text-(length:--text-xl) leading-relaxed font-light text-cream/80">
              {project.blurb}
            </p>
          </div>
        </div>

        {/* Stages */}
        <div className="border-t border-cream/10">
          {project.stages.map((stage, si) => (
            <section
              key={si}
              data-detail-stage
              className="shell border-b border-cream/8 py-[clamp(3rem,8vh,6rem)] last:border-b-0"
            >
              <p className="eyebrow mb-8">
                {String(si + 1).padStart(2, '0')} — {stage.title}
              </p>

              {/* Problem */}
              {stage.type === 'usecase' && (
                <p className="max-w-3xl font-display text-[clamp(1.15rem,2.6vw,2.1rem)] leading-[1.28] font-light tracking-tight text-cream/90">
                  {stage.content}
                </p>
              )}

              {/* Architecture — vertical stack with connectors */}
              {stage.type === 'architecture' && (
                <div className="flex flex-col items-stretch gap-0 lg:items-center">
                  {stage.diagram.map((node, i) => (
                    <div key={i} className="flex w-full flex-col items-center">
                      <div
                        className={cn(
                          'glass w-full max-w-xl px-6 py-5 text-center',
                          i === stage.diagram.length - 1 && 'border-lime/50',
                        )}
                      >
                        <span className="font-display text-[clamp(0.9rem,1.4vw,1.15rem)] font-semibold tracking-tight">
                          {node}
                        </span>
                      </div>
                      {i < stage.diagram.length - 1 && (
                        <div className="relative h-12 w-px bg-linear-to-b from-lime/60 to-cream/15">
                          <span className="absolute -bottom-px left-1/2 size-1.5 -translate-x-1/2 bg-lime" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Flow — numbered sequence */}
              {stage.type === 'flow' && (
                <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {stage.content.map((step, i) => (
                    <li key={i} className="flex items-start gap-4 border-t border-cream/12 pt-4">
                      <span className="font-mono text-[0.65rem] tracking-[0.15em] text-lime tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-(length:--text-body) leading-snug text-cream/80">{step}</span>
                    </li>
                  ))}
                </ol>
              )}

              {/* Features */}
              {stage.type === 'features' && (
                <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {stage.content.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-[0.5rem] size-1.5 shrink-0 bg-lime" />
                      <span className="text-(length:--text-body) leading-snug text-cream/80">{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech stack */}
              {stage.type === 'tech' && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {stage.techGroups.map((g) => (
                    <div key={g.label}>
                      <p className="mb-4 font-mono text-[0.62rem] tracking-[0.2em] text-fog/50 uppercase">
                        {g.label}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="border border-cream/15 px-3 py-1.5 font-mono text-[0.65rem] text-cream/70 transition-colors hover:border-lime/50 hover:text-lime"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Live link */}
              {stage.type === 'tryit' && (
                <div>
                  <p className="max-w-xl text-(length:--text-lg) text-cream/75">{stage.content}</p>
                  <a
                    href={stage.links.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-3 bg-lime px-7 py-4 font-mono text-[0.68rem] tracking-[0.18em] text-void uppercase transition-all duration-300 hover:bg-cream"
                  >
                    {stage.links.label}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer actions */}
        <div className="shell flex flex-wrap items-center gap-4 py-[clamp(3rem,8vh,6rem)]">
          <button
            onClick={onClose}
            className="border border-cream/20 px-7 py-4 font-mono text-[0.68rem] tracking-[0.18em] uppercase transition-colors hover:border-lime hover:text-lime"
          >
            Close
          </button>
          {liveLink && liveLink.type === 'tryit' && (
            <a
              href={liveLink.links.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.68rem] tracking-[0.18em] text-cream/60 uppercase underline underline-offset-4 transition-colors hover:text-lime"
            >
              Open live deployment
            </a>
          )}
        </div>
      </div>
    </div>
  )
}