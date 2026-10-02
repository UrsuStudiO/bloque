import About from './components/About.jsx'
import Collection from './components/Collection.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Lookbook from './components/Lookbook.jsx'
import Nav from './components/Nav.jsx'
import Newsletter from './components/Newsletter.jsx'
import { useLenis } from './hooks/useLenis.js'

export default function App() {
  useLenis()

  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <Collection />
        <Lookbook />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
