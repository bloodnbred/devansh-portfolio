import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/data/site'
import { scrollTo } from '@/lib/lenis'
import { cn } from '@/lib/utils'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const bar = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track which section owns the viewport so the nav can mark itself.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -40% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollTo(`#${id}`, -10)
  }

  return (
    <>
      <header
        ref={bar}
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-500',
          scrolled ? 'border-b border-cream/10 bg-void/80 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <nav className="shell flex h-[var(--nav-h)] items-center justify-between">
          <button
            onClick={() => go('home')}
            className="display text-[1.05rem] tracking-[0.02em] transition-colors hover:text-lime"
            aria-label="Back to top"
          >
            DEVANSH<span className="text-lime">.</span>
          </button>

          {/* Desktop */}
          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  aria-current={active === l.id ? 'page' : undefined}
                  className={cn(
                    'relative font-mono text-[0.7rem] tracking-[0.18em] uppercase transition-colors duration-300',
                    active === l.id ? 'text-lime' : 'text-cream/55 hover:text-cream',
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-px w-full origin-left bg-lime transition-transform duration-300',
                      active === l.id ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile trigger */}
          <button
            className="flex size-11 items-center justify-center md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-[79] flex flex-col justify-center bg-void/97 px-[var(--gutter)] backdrop-blur-2xl transition-opacity duration-400 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <ul className="space-y-2">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={cn(
                  'display w-full py-2 text-left text-[clamp(2.5rem,12vw,5rem)] transition-all duration-500',
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                  active === l.id ? 'text-lime' : 'text-cream',
                )}
                style={{ transitionDelay: `${open ? i * 60 + 120 : 0}ms` }}
              >
                <span className="mr-4 align-super font-mono text-[0.6rem] tracking-[0.2em] text-lime/60">
                  0{i + 1}
                </span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-10 font-mono text-[0.65rem] tracking-[0.15em] text-fog/50 uppercase">
          Scroll to explore
        </p>
      </div>
    </>
  )
}