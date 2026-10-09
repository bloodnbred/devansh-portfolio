import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { syncMotionOverride } from './lib/motion'

// Dev only, and before first render: the reduced-motion kill-switch in
// index.css reads a class on <html>, and App seeds its preloader state off the
// same flag. Guarded here so the whole module drops out of the production bundle
// and a real visitor's OS setting is the only thing that matters.
if (import.meta.env.DEV) syncMotionOverride()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)