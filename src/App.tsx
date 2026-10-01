import { useCallback, useEffect, useState } from 'react'
import { Preloader } from '@/components/Preloader'
import { Nav } from '@/components/Nav'
import { Cursor, ProgressBar } from '@/components/Cursor'
import { Hero } from '@/sections/Hero'
import { Ticker } from '@/sections/Ticker'
import { About } from '@/sections/About'
import { Stats } from '@/sections/Stats'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'
import { Journey } from '@/sections/Journey'
import { Resume } from '@/sections/Resume'
import { Contact } from '@/sections/Contact'
import { useSmoothScroll } from '@/lib/lenis'
import { prefersReducedMotion } from '@/lib/gsap'

export default function App() {
  const [loaded, setLoaded] = useState(() => prefersReducedMotion())

  useSmoothScroll(true)

  // Scroll restoration off: the pinned track assumes it starts at the top.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  const handleDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <Preloader onDone={handleDone} />}

      <div className={loaded ? '' : 'overflow-hidden'}>
        <ProgressBar />
        <Cursor />
        <Nav />

        <main className="relative">
          <Hero ready={loaded} />
          <Ticker />
          <About />
          <Stats />
          <Projects />
          <Skills />
          <Journey />
          <Resume />
          <Contact />
        </main>
      </div>
    </>
  )
}