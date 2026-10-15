import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Research from './components/Research'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import CursorGlow from './components/CursorGlow'

function App() {
  return (
    <div className="min-h-screen">
      {/* Layered ambient backdrop: static grid + accent vignette + grain +
          particle field + pointer light. All decorative, all pointer-inert. */}
      <div className="grid-backdrop" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <ParticleBackground />
      <CursorGlow />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <span className="hairline mx-auto block max-w-6xl" aria-hidden="true" />
        <About />
        <Skills />
        <span className="hairline mx-auto block max-w-6xl" aria-hidden="true" />
        <Projects />
        <Research />
        <span className="hairline mx-auto block max-w-6xl" aria-hidden="true" />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
