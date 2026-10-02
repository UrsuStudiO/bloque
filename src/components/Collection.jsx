import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  { id: 1, name: 'Chaqueta Bloque 01', price: '€420', h: 420, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=900&auto=format&fit=crop' },
  { id: 2, name: 'Cargo Reforzado', price: '€280', h: 560, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=900&auto=format&fit=crop' },
  { id: 3, name: 'Hoodie Estructura', price: '€190', h: 340, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop' },
  { id: 4, name: 'Chaleco Técnico', price: '€310', h: 480, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop' },
  { id: 5, name: 'Pantalón Bloque 02', price: '€260', h: 400, img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop' },
  { id: 6, name: 'Camisa Oversize', price: '€175', h: 300, img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop' },
  { id: 7, name: 'Abrigo Editorial', price: '€510', h: 520, img: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=900&auto=format&fit=crop' },
  { id: 8, name: 'Falda Estructurada', price: '€225', h: 360, img: 'https://images.unsplash.com/photo-1596993100471-c3905dafa78e?q=80&w=900&auto=format&fit=crop' },
]

const COLUMNS = [0, 1, 2, 3].map((col) => PRODUCTS.filter((_, i) => i % 4 === col))
const PARALLAX_RATIOS = [1.4, 0.7, 1.4, 0.7]

export default function Collection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const columns = gsap.utils.toArray('.collection-column')

      if (isDesktop && !prefersReduced) {
        columns.forEach((col, i) => {
          const ratio = PARALLAX_RATIOS[i] ?? 1
          const distance = 260 * (ratio - 1)
          gsap.fromTo(
            col,
            { y: distance },
            {
              y: -distance,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        })

        gsap.utils.toArray('.product-card img').forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 1.08,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.product-card'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          )
        })
      } else {
        columns.forEach((col) => {
          gsap.fromTo(
            col,
            { y: 40 },
            {
              y: -40,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          )
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="coleccion"
      ref={sectionRef}
      className="relative overflow-hidden bg-paper-50 px-6 py-28 md:px-10 dark:bg-ink-950"
    >
      <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-display text-huge leading-[0.9] text-char uppercase dark:text-bone">
          Colección
          <br />
          Destacada
        </h2>
        <p className="max-w-xs text-sm text-char/60 dark:text-bone/60">
          Piezas construidas para moverse. Sin relleno, sin temporada muerta.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {COLUMNS.map((col, ci) => (
          <div key={ci} className="collection-column flex flex-col gap-4 md:gap-6">
            {col.map((p) => (
              <div
                key={p.id}
                className="product-card group relative overflow-hidden bg-ink-900"
                style={{ height: `${p.h * 0.65}px` }}
              >
                <img
                  src={p.img}
                  alt={`${p.name} — detalle de textura, fotografía editorial de moda`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-paper-50 px-4 py-3 transition-transform duration-300 ease-(--ease-editorial) group-hover:translate-y-0">
                  <span className="text-sm font-semibold text-char">{p.name}</span>
                  <span className="text-sm text-signal">{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
