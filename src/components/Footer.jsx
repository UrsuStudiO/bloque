import { AtSign, Layers, Mail } from 'lucide-react'
import { useState } from 'react'

const LINKS = [
  { label: 'Instagram', href: '#', icon: AtSign },
  { label: 'Behance', href: '#', icon: Layers },
  { label: 'Contacto', href: 'mailto:hola@bloquestudio.com', icon: Mail },
]

export default function Footer() {
  const [showCredit, setShowCredit] = useState(false)

  return (
    <footer className="relative overflow-hidden bg-char pt-16 text-bone dark:bg-ink-950">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex items-center" aria-hidden={rep === 1}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="px-6 font-display text-[14vw] leading-none text-bone uppercase md:text-[9vw]"
              >
                BLOQUE
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-6 border-t border-bone/15 px-6 py-8 text-sm md:flex-row md:items-center md:px-10">
        <p className="text-bone/50">© {new Date().getFullYear()} Bloque Studio.</p>
        <div className="flex gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="flex items-center gap-2 text-bone/70 transition-colors hover:text-acid"
            >
              <l.icon size={14} />
              {l.label}
            </a>
          ))}
        </div>
        <div
          className="relative"
          onMouseEnter={() => setShowCredit(true)}
          onMouseLeave={() => setShowCredit(false)}
        >
          <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 overflow-hidden whitespace-nowrap">
            <span
              className={`block font-display text-[1.78rem] tracking-wide text-bone transition-all duration-500 ease-(--ease-editorial) ${
                showCredit ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              Ursu<span className="text-acid">Studio</span>
            </span>
          </div>

          <a
            href="https://ursustudio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full border border-bone/15 px-4 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-bone/50 transition-colors duration-300"
          >
            <span className="transition-colors duration-300 group-hover:text-bone">Créditos</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
