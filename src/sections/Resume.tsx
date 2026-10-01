import { useState } from 'react'
import { Download } from 'lucide-react'
import { identity } from '@/data/site'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

export function Resume() {
  const [hot, setHot] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const download = () => {
    // Native anchor download. The file is same-origin, so the download
    // attribute is honoured.
    const a = document.createElement('a')
    a.href = identity.resumeHref
    a.download = identity.resumeFilename
    document.body.appendChild(a)
    a.click()
    a.remove()

    // Brief confirmation so the click has visible consequence.
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 1600)
  }

  return (
    <section className="relative border-t border-cream/10 py-[clamp(6rem,14vh,11rem)]">
      <div className="shell flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">05 — Résumé</p>
          <h2 className="display mt-5 text-(length:--text-mega)">
            The
            <br />
            <span className="text-lime">paperwork</span>
          </h2>
        </Reveal>

        {/* Card sits blurred until you approach it — the same tease as the
            original build, but sharper. */}
        <Reveal delay={0.14}>
          <div
            className="group relative mt-[clamp(3rem,7vh,5rem)] w-full max-w-md cursor-pointer"
            onMouseEnter={() => setHot(true)}
            onMouseLeave={() => setHot(false)}
            onFocus={() => setHot(true)}
            onBlur={() => setHot(false)}
            onClick={download}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                download()
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Download resume"
          >
            <div
              className={cn(
                'border border-cream/12 bg-ink p-8 transition-all duration-(--dur) ease-(--ease-brand)',
                hot && 'border-lime/50',
              )}
              style={{
                filter: hot ? 'blur(0px)' : 'blur(1.5px)',
                boxShadow: hot
                  ? '0 0 60px -12px rgb(210 255 0 / 0.28), inset 0 0 40px -18px rgb(210 255 0 / 0.2)'
                  : 'none',
              }}
            >
              {/* Skeleton lines standing in for the document */}
              <div className="mb-6 h-2 w-2/3 bg-cream/15" />
              <div className="mb-2.5 h-1.5 w-full bg-cream/10" />
              <div className="mb-2.5 h-1.5 w-5/6 bg-cream/10" />
              <div className="mb-6 mt-7 h-1.5 w-1/2 bg-cream/10" />
              <div className="mb-2.5 h-1.5 w-full bg-cream/10" />
              <div className="mb-2.5 h-1.5 w-4/5 bg-cream/10" />
              <div className="mt-7 h-1.5 w-1/3 bg-cream/10" />

              <div className="mt-9 flex items-center justify-center gap-3 border-t border-cream/10 pt-6">
                <Download
                  className={cn(
                    'size-4 transition-all duration-500',
                    hot ? 'translate-y-0.5 text-lime' : 'text-cream/50',
                  )}
                />
                <span className="font-mono text-[0.68rem] tracking-[0.18em] text-cream/70 uppercase">
                  {hot ? 'Release to download' : 'Download résumé'}
                </span>
              </div>
            </div>

            {/* Confirmation flash */}
            <span
              className={cn(
                'pointer-events-none absolute inset-0 flex items-center justify-center bg-lime font-mono text-[0.68rem] tracking-[0.2em] text-void uppercase transition-opacity duration-300',
                downloaded && 'opacity-100',
              )}
            >
              Downloaded
            </span>
          </div>
        </Reveal>

        <p className="mt-6 max-w-xs font-mono text-[0.62rem] leading-relaxed tracking-[0.1em] text-fog/45 uppercase">
          PDF · {identity.full}
        </p>
      </div>
    </section>
  )
}