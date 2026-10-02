import { ArrowDown } from 'lucide-react'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const LINES = ['DISEÑO', 'SIN', 'EXCUSA.']
const BADGE_TEXT = 'ESTUDIO DE DISEÑO — AW26'

export default function Hero() {
  const rootRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const tl = gsap.timeline({ delay: 0.15 })

      if (prefersReduced) {
        tl.from('.hero-line-inner', { opacity: 0, duration: 0.4 }).from(
          '.hero-image',
          { opacity: 0, duration: 0.4 },
          '<'
        )
      } else {
        tl.from('.hero-line-inner', {
          clipPath: 'inset(0 0 100% 0)',
          y: 40,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.1,
        })
          .from('.hero-image', { xPercent: 100, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      }

      if (badgeRef.current && !prefersReduced) {
        badgeRef.current.textContent = ''
        let shown = 0
        gsap.timeline({ delay: 1.1 }).to(
          {},
          {
            duration: BADGE_TEXT.length * 0.035,
            onUpdate: function () {
              const chars = Math.floor(this.progress() * BADGE_TEXT.length)
              if (chars !== shown) {
                shown = chars
                badgeRef.current.textContent = BADGE_TEXT.slice(0, chars)
              }
            },
          }
        )
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-paper-50 px-6 pt-32 pb-16 md:px-10 dark:bg-ink-950"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p
            ref={badgeRef}
            className="mb-6 font-body text-xs tracking-[0.2em] text-signal dark:text-acid"
          >
            {BADGE_TEXT}
          </p>

          <h1 className="font-display text-mega leading-[1.1] text-char uppercase dark:text-bone">
            {LINES.map((line) => (
              <span className="split-line" key={line}>
                <span className="hero-line-inner block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-md text-base text-char/70 md:text-lg dark:text-bone/70">
            Identidad, campañas y producto digital para marcas de streetwear que no piden
            permiso.
          </p>

          <a
            href="#coleccion"
            className="mt-10 inline-flex items-center gap-3 border border-char px-6 py-3 text-sm font-semibold tracking-wide text-char transition-colors duration-200 hover:border-acid hover:bg-acid hover:text-char dark:border-bone dark:text-bone"
          >
            Ver el trabajo
            <ArrowDown size={16} />
          </a>
        </div>

        <div className="relative aspect-3/4 overflow-hidden md:col-span-5">
          <img
            className="hero-image h-full w-full object-cover contrast-125 grayscale"
            src="/images/streetwear.webp"
            alt="Modelo con streetwear oversize en estudio, iluminación de alto contraste"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
