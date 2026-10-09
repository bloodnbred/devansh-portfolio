/**
 * Reduced motion is an accessibility setting, not a bug — but plenty of
 * machines (Windows "Animation effects" off is the usual one) report
 * `prefers-reduced-motion: reduce`, and then the whole site reads as broken
 * while you are the one trying to build it.
 *
 * `?motion=force` opts back in for development only, and remembers itself for
 * the rest of the tab's session so a reload mid-review does not lose it.
 * `?motion=system` hands control back to the OS and clears the memory.
 * Production always follows the OS.
 */

const PARAM = 'motion'
const STORE = 'dev:motion'

export type MotionOverride = 'force' | 'system'

function read(): MotionOverride | null {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null

  const fromUrl = new URLSearchParams(window.location.search).get(PARAM)
  const explicit: MotionOverride | null =
    fromUrl === 'force' || fromUrl === 'on'
      ? 'force'
      : fromUrl === 'system' || fromUrl === 'off'
        ? 'system'
        : null

  try {
    if (explicit === 'force') sessionStorage.setItem(STORE, 'force')
    else if (explicit === 'system') sessionStorage.removeItem(STORE)
    else return sessionStorage.getItem(STORE) === 'force' ? 'force' : null
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The explicit
    // URL value still applies for this load; it just will not be remembered.
    if (!explicit) return null
  }

  return explicit
}

export const motionOverride = () => read()

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  read() !== 'force' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The kill-switch at the bottom of index.css is plain CSS, so it cannot read a
 * query param. This mirrors the JS decision onto <html> to keep the two halves
 * of the reduced-motion story in agreement.
 */
export function syncMotionOverride() {
  if (typeof document === 'undefined') return
  const forced = read() === 'force'
  document.documentElement.classList.toggle('motion-force', forced)
  if (forced) {
    console.info('[motion] prefers-reduced-motion overridden — animations forced on (dev only)')
  }
}
