import { useEffect, useRef } from 'react'
import { about, identity } from '@/data/site'
import { Reveal } from '@/components/Reveal'
import { SplitText } from '@/components/SplitText'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

export function About() {
  const principles = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = principles.current
    if (!el || prefersReducedMotion()) return

    const lines = el.querySelectorAll<HTMLElement>('[data-line]')

    const ctx = gsap.context(() => {
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 60, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: line, start: 'top 88%' },
          },
        )
        // Index marker counts up alongside each line arriving.
        gsap.fromTo(
          line.querySelector('[data-num]'),
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'back.out(2)',
            delay: 0.12,
            scrollTrigger: { trigger: line, start: 'top 88%' },
          },
        )
        void i
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="relative py-[clamp(6rem,14vh,12rem)]">
      <div className="shell">
        {/* Lead paragraph */}
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_1.6fr]">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <Reveal>
              <p className="eyebrow">01 — About</p>
              <h2 className="display mt-5 text-(length:--text-mega)">
                How I
                <br />
                <span className="text-lime">think</span>
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[0.65rem] tracking-[0.15em] text-fog/50 uppercase">
                <span className="inline-block h-px w-8 bg-lime" />
                {identity.institution}
              </div>
            </Reveal>
          </div>

          <div className="space-y-7">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="max-w-2xl text-(length:--text-xl) leading-[1.28] font-light text-cream/90">
                  {p}
                </p>
              </Reveal>
            ))}

            {/* Signature */}
            <Reveal delay={0.16}>
              <div className="mt-10 flex items-center gap-4 border-l border-lime/40 pl-5">
                <span className="display text-[1.4rem] tracking-tight">{identity.full}</span>
                <span className="font-mono text-[0.62rem] tracking-[0.15em] text-fog/50 uppercase">
                  {identity.role}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Principles — large statements, each with its own arrival */}
        <div ref={principles} className="mt-[clamp(5rem,12vh,9rem)] space-y-1 border-t border-cream/10 pt-[clamp(3rem,7vh,5rem)]">
          {about.principles.map((line, i) => (
            <div
              key={i}
              data-line
              className="group flex items-baseline gap-5 border-b border-cream/8 py-5 transition-colors duration-500 hover:border-lime/40 md:gap-8 md:py-7"
            >
              <span
                data-num
                className="font-mono text-[0.65rem] tracking-[0.2em] text-lime/70 tabular-nums"
              >
                0{i + 1}
              </span>
              <SplitText
                text={line}
                variant="fade"
                stagger={0.012}
                className="text-[clamp(1.15rem,3.1vw,2.6rem)] leading-tight font-light tracking-tight text-cream/75 transition-colors duration-500 group-hover:text-lime"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}