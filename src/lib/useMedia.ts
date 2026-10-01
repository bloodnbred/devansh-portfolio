import { useEffect, useState } from 'react'

/** Reactive media query. */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const useIsDesktop = () => useMedia('(min-width: 1024px)')
export const useIsTouch = () => useMedia('(max-width: 1023px), (pointer: coarse)')
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')