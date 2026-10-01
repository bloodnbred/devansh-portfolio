import { stats } from '@/data/site'
import { Counter } from '@/components/Counter'
import { Reveal } from '@/components/Reveal'

export function Stats() {
  return (
    <section className="relative border-y border-cream/10 bg-ink py-[clamp(4rem,10vh,7rem)]">
      <div className="shell">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group relative border-l border-cream/12 pl-5 transition-colors duration-500 hover:border-lime md:pl-7">
                <p className="display text-[clamp(2.4rem,6.5vw,5.5rem)] leading-none text-cream transition-colors duration-500 group-hover:text-lime">
                  <Counter
                    value={s.value}
                    decimals={s.decimals}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </p>
                <p className="mt-3 font-mono text-[0.62rem] tracking-[0.2em] text-fog/60 uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}