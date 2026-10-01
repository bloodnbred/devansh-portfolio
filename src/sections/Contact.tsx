import { contactLinks, identity } from '@/data/site'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Marquee } from '@/components/Marquee'

export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-t border-cream/10 pt-[clamp(6rem,14vh,10rem)] pb-8"
    >
      {/* Oversized watermark — the footer wordmark, bleeding off the edges */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-[3vw] select-none" aria-hidden>
        <p className="display text-[26vw] leading-none text-cream/[0.045]">
          DEVANSH
        </p>
      </div>

      <div className="shell relative z-10">
        <Reveal>
          <p className="eyebrow">06 — Contact</p>
          <h2 className="display mt-6 text-[clamp(2.75rem,10vw,9rem)]">
            Let’s work
            <br />
            <span className="outline-text">together</span>
          </h2>
          <p className="mt-8 max-w-md text-(length:--text-lg) leading-relaxed text-cream/70">
            Have a project in mind or want to collaborate? I’m always open to discussing new
            opportunities, ideas, and ways to bring your vision to life.
          </p>
        </Reveal>

        {/* Link rows */}
        <div className="mt-[clamp(3.5rem,8vh,6rem)] max-w-3xl">
          {contactLinks.map((l, i) => (
            <Reveal key={l.label} delay={0.08 * i}>
              <a
                href={l.href}
                target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-cream/12 py-5 transition-colors duration-400 hover:border-lime md:py-6"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] text-lime/70 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="display-tight text-[clamp(1.4rem,4.5vw,3.2rem)] transition-transform duration-500 group-hover:translate-x-2 group-hover:text-lime">
                    {l.label}
                  </span>
                </span>
                <ArrowUpRight className="size-6 shrink-0 text-cream/40 transition-all duration-400 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-lime md:size-8" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="shell relative z-10 mt-[clamp(4rem,10vh,8rem)]">
        <div className="border-t border-cream/12 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[0.62rem] tracking-[0.15em] text-fog/55 uppercase">
              © {identity.year} {identity.full}
            </p>
            <p className="font-mono text-[0.62rem] tracking-[0.15em] text-fog/55 uppercase">
              {identity.institution}
            </p>
            <p className="font-mono text-[0.62rem] tracking-[0.15em] text-lime/70 uppercase">
              Built with precision
            </p>
          </div>
        </div>

        {/* Availability strip — one last bit of motion */}
        <div className="mt-6 -mx-[var(--gutter)] opacity-30">
          <Marquee
            items={['Open to internships', 'Open to collaborations', 'Open to opportunities']}
            direction="left"
            duration={30}
            className="[&_span]:text-[clamp(1rem,2.4vw,2rem)]"
          />
        </div>
      </div>
    </section>
  )
}