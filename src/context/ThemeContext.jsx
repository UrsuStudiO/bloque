import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'bloque-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const originRef = useRef({ x: '50%', y: '50%' })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // View Transitions API: the browser snapshots, animates and cleans up the transition
  const toggleTheme = useCallback((event) => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'

    if (event?.clientX != null) {
      originRef.current = { x: `${event.clientX}px`, y: `${event.clientY}px` }
    }

    const supportsViewTransitions = typeof document.startViewTransition === 'function'
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!supportsViewTransitions || prefersReducedMotion) {
      setTheme(next)
      return
    }

    const transition = document.startViewTransition(() => {
      setTheme(next)
    })

    transition.ready.then(() => {
      const endRadius = Math.hypot(window.innerWidth, window.innerHeight)
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${originRef.current.x} ${originRef.current.y})`,
            `circle(${endRadius}px at ${originRef.current.x} ${originRef.current.y})`,
          ],
        },
        {
          duration: 550,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return ctx
}
