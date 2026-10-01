import { skills } from '@/data/site'
import { Reveal } from '@/components/Reveal'

export function Skills() {
  return (
    <section className="relative border-t border-cream/10 py-[clamp(6rem,14vh,11rem)]">
      <div className="shell">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[0.8fr_2fr]">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <Reveal>
              <p className="eyebrow">03 — Skills</p>
              <h2 className="display mt-5 text-(length:--text-mega)">
                The
                <br />
                <span className="text-lime">toolkit</span>
              </h2>
            </Reveal>
          </div>

          <div className="space-y-14">
            {skills.map((group, gi) => (
              <div key={group.title}>
                <Reveal delay={gi * 0.06}>
                  <div className="flex items-baseline gap-5 border-b border-cream/12 pb-4">
                    <span className="font-mono text-[0.62rem] tracking-[0.2em] text-lime tabular-nums">
                      {String(gi + 1).padStart(2, '0')}
                    </span>
                    <h3 className="display text-[clamp(1.1rem,2.2vw,1.8rem)]">{group.title}</h3>
                  </div>
                </Reveal>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {group.items.map((item, i) => (
                    <Reveal key={item} delay={0.04 * i} from="up" duration={0.6}>
                      <li className="group/chip relative overflow-hidden border border-cream/15 px-4 py-2.5 transition-colors duration-400 hover:border-lime/60">
                        {/* Wipe fill on hover — the tactile bit. */}
                        <span className="absolute inset-0 origin-bottom scale-y-0 bg-lime transition-transform duration-(--dur-fast) ease-(--ease-brand) group-hover/chip:scale-y-100" />
                        <span className="relative font-mono text-[0.7rem] tracking-[0.06em] text-cream/75 uppercase transition-colors duration-300 group-hover/chip:text-void">
                          {item}
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}