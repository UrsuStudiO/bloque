import { Check } from 'lucide-react'
import { gsap } from 'gsap'
import { useRef, useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const stampRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    requestAnimationFrame(() => {
      if (!stampRef.current) return
      gsap.fromTo(
        stampRef.current,
        { scale: 0, rotate: -12, opacity: 0 },
        { scale: 1, rotate: -8, opacity: 1, duration: 0.5, ease: 'back.out(3)' }
      )
    })
  }

  return (
    <section id="drop" className="relative bg-paper-50 px-6 py-28 md:px-10 dark:bg-ink-950">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-huge leading-[0.9] text-char uppercase dark:text-bone">
          Drop alert
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm text-char/60 dark:text-bone/60">
          Un correo cuando hay algo nuevo. Nada más.
        </p>

        <form onSubmit={handleSubmit} className="relative mt-10">
          <div className="flex flex-col gap-3 border-2 border-char sm:flex-row dark:border-bone">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              aria-label="Correo electrónico"
              className="w-full flex-1 bg-transparent px-5 py-4 text-char placeholder:text-char/40 focus:outline-none dark:text-bone dark:placeholder:text-bone/40"
            />
            <button
              type="submit"
              className="shrink-0 bg-char px-8 py-4 text-sm font-semibold tracking-wide text-bone transition-colors duration-200 ease-(--ease-editorial) hover:bg-acid hover:text-char dark:bg-bone dark:text-char dark:hover:bg-acid"
            >
              {sent ? 'Suscrito' : 'Suscribirme'}
            </button>
          </div>

          {sent && (
            <div
              ref={stampRef}
              className="pointer-events-none absolute -top-6 -right-4 flex items-center gap-1 border-2 border-signal px-3 py-1 font-display text-xs text-signal uppercase md:-right-8"
            >
              <Check size={14} />
              Confirmado
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
