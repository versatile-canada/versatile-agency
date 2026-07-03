import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import Approach from './components/Approach'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-void overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Process />
      <Approach />
      <CTA />
      <Footer />
    </div>
  )
}
