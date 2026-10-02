import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const FRAMES = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1400&auto=format&fit=crop',
    caption: 'Look 01 — Bloque de asfalto',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1483118714900-540cf339fd46?q=80&w=1400&auto=format&fit=crop',
    caption: 'Look 02 — Contraluz',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1400&auto=format&fit=crop',
    caption: 'Look 03 — Paso peatonal',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1400&auto=format&fit=crop',
    caption: 'Look 04 — Esquina',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1400&auto=format&fit=crop',
    caption: 'Look 05 — Terminal',
  },
]

export default function Lookbook() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const track = trackRef.current

      if (!isDesktop || prefersReduced || !track) return

      const getScrollDistance = () => track.scrollWidth - window.innerWidth

      // Pinned horizontal scroll (desktop only): the track slides left → right
      track.classList.add('lookbook-pinned')

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,

        animation: gsap.fromTo(
          track,
          {
            x: () => -getScrollDistance(),
          },
          {
            x: 0,
            ease: 'none',
          }
        ),
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      trackRef.current?.classList.remove('lookbook-pinned')
    }
  }, [])

  return (
    <section
      id="lookbook"
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-900"
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex h-screen items-center gap-6 overflow-x-auto px-6 md:gap-10 md:px-10"
      >
        {FRAMES.map((f) => (
          <div
            key={f.id}
            className="group relative h-[70vh] w-[78vw] flex-shrink-0 overflow-hidden md:h-[75vh] md:w-[46vw] lg:w-[34vw]"
          >
            <img
              src={f.img}
              alt={`${f.caption}, fotografía street style de la colección`}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-110
              "
            />

            <span
              className="
                absolute
                bottom-4
                left-4
                text-xs
                tracking-[0.15em]
                text-bone/90
              "
            >
              {f.caption}
            </span>
          </div>
        ))}

        <div className="flex-shrink-0 pr-4 pl-2 md:w-[26vw] md:pl-6">
          <h2 className="font-display text-huge leading-[0.9] text-bone uppercase">
            Look
            <br />
            book
          </h2>

          <p className="mt-6 max-w-xs text-sm text-bone/60">
            Cinco escenas, una colección. Desliza.
          </p>
        </div>
      </div>
    </section>
  )
}