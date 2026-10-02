import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const PARAGRAPH =
  'Bloque Studio existe para marcas que no piden permiso. Diseñamos identidad, campaña y producto digital con la misma urgencia con la que se corta una colección.'

const STATS = [
  { value: 46, suffix: '', label: 'Marcas lanzadas' },
  { value: 12, suffix: '', label: 'Países' },
  { value: 8, suffix: '', label: 'Años en el ruido' },
]

export default function About() {
  const sectionRef = useRef(null)
  const words = PARAGRAPH.split(' ')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReduced) {
        gsap.from('.about-word', {
          opacity: 0,
          duration: 0.4,
          stagger: 0.01,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      } else {
        gsap.utils.toArray('.about-word').forEach((word) => {
          gsap.fromTo(
            word,
            { rotate: gsap.utils.random(-8, 8), y: 24, opacity: 0 },
            {
              rotate: 0,
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'back.out(1.7)',
              delay: gsap.utils.random(0, 0.25),
              scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
            }
          )
        })
      }

      gsap.utils.toArray('.stat-number').forEach((el) => {
        const target = Number(el.dataset.value)
        const counter = { val: 0 }
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val)
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="marca" ref={sectionRef} className="relative bg-paper-50 px-6 py-28 md:px-10 dark:bg-ink-950">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
        <p className="font-display text-huge leading-[0.95] text-char uppercase md:col-span-8 dark:text-bone">
          {words.map((w, i) => (
            <span className="about-word mr-[0.3ch] inline-block" key={i}>
              {w}
            </span>
          ))}
        </p>

        <div className="flex flex-row gap-10 md:col-span-4 md:flex-col md:justify-center">
          {STATS.map((s) => (
            <div key={s.label} className="border-l-2 border-signal pl-4 dark:border-acid">
              <div className="font-display text-4xl text-char md:text-5xl dark:text-bone">
                <span className="stat-number" data-value={s.value}>
                  0
                </span>
                {s.suffix}
              </div>
              <p className="mt-1 text-xs tracking-wide text-char/50 uppercase dark:text-bone/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
