import { useEffect, useRef } from 'react'
import { identity, heroHighlights } from '@/data/site'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ready) return
    const el = root.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Portrait opens from a collapsed ellipse at its top edge.
      tl.fromTo(
        '[data-hero-img]',
        { clipPath: 'ellipse(0% 0% at 50% 0%)', scale: 1.25 },
        { clipPath: 'ellipse(150% 130% at 50% 40%)', scale: 1, duration: 1.5 },
        0.1,
      )
        .fromTo(
          '[data-hero-fade]',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.09 },
          0.5,
        )
        // The role line wipes out from behind its own mask.
        .fromTo(
          '[data-hero-mask]',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, transformOrigin: 'left center' },
          0.85,
        )
        .fromTo('[data-hero-scroll]', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.3)

      // Cursor-following parallax on the portrait, desktop only.
      if (window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) {
        const qx = gsap.quickTo('[data-hero-img]', 'x', { duration: 1.1, ease: 'power3.out' })
        const px = gsap.quickTo('[data-hero-parallax]', 'x', { duration: 1.4, ease: 'power3.out' })
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width
          px(dx * -18)
          qx(dx * 8)
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      }
    }, el)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[calc(var(--nav-h)+1.5rem)] pb-[9vh]"
    >
      {/* Ambient accent wash */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgb(210 255 0 / 0.10), transparent 70%)' }}
      />

      <div className="shell relative z-10 grid grid-cols-1 items-end gap-10 lg:h-[min(72svh,44rem)] lg:grid-cols-[1.35fr_1fr]">
        {/* Type */}
        <div>
          <p data-hero-fade className="eyebrow mb-6">
            {identity.role}
          </p>

          {/* Massive name. Second word outlined, as on the reference. */}
          <h1 className="display leading-[0.82]">
            <span data-hero-mask className="block origin-left text-(length:--text-hero)">
              {identity.first}
            </span>
            <span
              data-hero-mask
              className="outline-text block origin-left text-(length:--text-hero)"
              style={{ animationDelay: '120ms' }}
            >
              {identity.last}
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-12">
            <div data-hero-fade className="max-w-sm">
              <p className="text-(length:--text-lg) leading-snug text-cream/80">
                {identity.subrole}
              </p>
              <p className="mt-1 font-mono text-[0.72rem] tracking-[0.12em] text-fog/60 uppercase">
                {identity.institution}
              </p>
            </div>

            <ul data-hero-fade className="grid grid-cols-1 gap-x-8 gap-y-1.5">
              {heroHighlights.map((h) => (
                <li key={h} className="flex items-start gap-3 font-mono text-[0.72rem] tracking-[0.05em] text-cream/55">
                  <span className="mt-[0.45rem] size-1 shrink-0 bg-lime" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portrait */}
        <div data-hero-parallax className="relative hidden h-full lg:block">
          <div className="relative size-full overflow-hidden">
            <img
              data-hero-img
              src={identity.portrait}
              alt={identity.full}
              width={1599}
              height={1199}
              className="duotone size-full object-cover object-top contrast-125"
              fetchPriority="high"
            />
            {/* Lime wash ties the photo to the palette without recolouring skin. */}
            <div className="pointer-events-none absolute inset-0 bg-lime/12 mix-blend-color" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-cream/10 ring-inset" />
          </div>

          <div data-hero-fade className="mt-4 flex items-center justify-between font-mono text-[0.62rem] tracking-[0.15em] text-fog/50 uppercase">
            <span>Roll {identity.rollNo}</span>
            <span className="text-lime">2026</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero-scroll
        className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto hidden w-fit flex-col items-center gap-2 lg:flex"
      >
        <span className="font-mono text-[0.58rem] tracking-[0.28em] text-fog/50 uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-cream/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollCue_1.8s_ease-in-out_infinite] bg-lime" />
        </span>
      </div>

      <style>{`@keyframes scrollCue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  )
}