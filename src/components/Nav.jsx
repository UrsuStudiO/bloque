import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'

const LINKS = [
  { href: '#coleccion', label: 'Colección' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#marca', label: 'Estudio' },
  { href: '#drop', label: 'Drop' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-[100] border-b transition-colors duration-500 ${solid
            ? 'border-char/10 bg-paper-50/85 backdrop-blur-md dark:border-bone/10 dark:bg-ink-950/85'
            : 'border-transparent bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="relative z-[120] font-display text-lg tracking-tight text-char dark:text-bone"
          >
            BLOQUE
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-char/80 transition-colors duration-300 hover:text-signal dark:text-bone/80 dark:hover:text-acid"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="relative z-[120] flex items-center gap-3">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="relative flex h-10 w-10 items-center justify-center border border-char/20 text-char transition-colors duration-300 hover:border-signal hover:text-signal md:hidden dark:border-bone/20 dark:text-bone dark:hover:border-acid dark:hover:text-acid"
            >
              <Menu
                size={18}
                className={`absolute transition-all duration-300 ${open
                    ? 'rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                  }`}
              />

              <X
                size={18}
                className={`absolute transition-all duration-300 ${open
                    ? 'rotate-0 scale-100 opacity-100'
                    : '-rotate-90 scale-0 opacity-0'
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      <nav
        inert={!open}
        className={`fixed inset-0 z-[90] h-[100dvh] w-screen overflow-hidden bg-paper-50 transition-all duration-500 md:hidden dark:bg-ink-950 ${open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-full opacity-0'
          }`}
      >
        <div className="flex h-full flex-col px-6 pt-[92px] pb-6">
          <div className="flex flex-col">
            {LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`group flex min-h-[76px] items-center border-b border-char/10 font-display text-[clamp(2.4rem,10vw,4rem)] leading-none tracking-tight text-char transition-all duration-500 hover:text-signal dark:border-bone/10 dark:text-bone dark:hover:text-acid ${open
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                  }`}
                style={{
                  transitionDelay: open ? `${index * 70}ms` : '0ms',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-auto flex items-center justify-between border-t border-char/10 pt-4 text-[9px] uppercase tracking-[0.2em] text-char/30 transition-opacity duration-700 dark:border-bone/10 dark:text-bone/30 ${open ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              transitionDelay: open ? '450ms' : '0ms',
            }}
          >
            <span>Menu</span>
          </div>
        </div>
      </nav>
    </>
  )
}