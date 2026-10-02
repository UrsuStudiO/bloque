# Bloque Studio

Landing page de una sola página (demo de portfolio) para Bloque Studio, un estudio de diseño ficticio para marcas de moda urbana. Estética editorial y brutalista: tipografía enorme, acento amarillo ácido, scroll suave, parallax, un lookbook con scroll horizontal y modo claro/oscuro.

## Secciones

Hero · Colección · Lookbook · Estudio (sobre nosotros) · Drop (newsletter) · Footer

## Stack

- React 19 + Vite + Tailwind CSS v4 (vía `@tailwindcss/vite`, sin `tailwind.config.js`)
- GSAP + ScrollTrigger: animación de entrada del hero, parallax de la colección, lookbook con `pin` + `scrub`, texto por palabras y contadores
- Lenis: smooth scroll sincronizado con ScrollTrigger
- Lucide React: iconos
- Tipografías Archivo Black e Inter (Google Fonts, cargadas en `index.html`)

Las versiones exactas están en `package.json`.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que indique Vite (por defecto http://localhost:5173).

```bash
npm run build     # build de producción en dist/
npm run preview   # sirve el build localmente
```

## Estructura

```
public/
  images/         imagen del hero (WebP)
  favicon.svg
  robots.txt
src/
  components/     Nav, Hero, Collection, Lookbook, About, Newsletter, Footer, ThemeToggle
  context/        ThemeContext.jsx — tema claro/oscuro (localStorage + View Transitions API)
  hooks/          useLenis.js — smooth scroll
  index.css       tema de Tailwind v4 (@theme): colores, tipografías, tamaños y easing
```

## Notas

- **Tema:** respeta la preferencia del sistema en la primera visita y guarda la elección del usuario. El tema se aplica con un script en `index.html` antes del primer pintado, para evitar un parpadeo al cargar. La transición circular usa la View Transitions API; en navegadores que no la soportan, o con `prefers-reduced-motion`, el cambio es directo.
- **Modo oscuro en Tailwind:** se define con `@custom-variant dark` en `src/index.css` y se activa con el atributo `data-theme="dark"` en `<html>`.
- **Colores y tamaños:** viven en el bloque `@theme` de `src/index.css` (`ink`, `paper`, `acid`, `signal`, `bone`, `char`, y los tamaños `text-mega` / `text-huge`).
- **Lookbook:** desde 1024px de ancho usa `pin` + `scrub` (el scroll vertical mueve el carrusel en horizontal). En pantallas menores, o con `prefers-reduced-motion`, es un carrusel horizontal con scroll nativo.
- **Imágenes:** las fotos de la colección y el lookbook son de Unsplash, usadas como placeholder. La imagen del hero está en `public/images/`. Para uso real, reemplázalas por fotografía propia.
- **Newsletter:** el formulario es solo frontend, no envía datos a ningún backend.
- **Datos ficticios:** el correo de contacto, las marcas, los precios y los enlaces a redes del footer son de ejemplo.
- **Accesibilidad:** las animaciones (GSAP, Lenis y CSS) se desactivan o se reducen con `prefers-reduced-motion`, y los elementos interactivos tienen foco visible por teclado.
