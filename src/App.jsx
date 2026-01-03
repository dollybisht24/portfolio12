import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Education from './pages/Education'
import Certifications from './pages/Certifications'
import CertView from './pages/CertView'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

export default function App(){
  return (
    <BrowserRouter>
      <div className="app min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/skills" element={<Skills/>} />
            <Route path="/education" element={<Education/>} />
            <Route path="/certifications" element={<Certifications/>} />
            <Route path="/certifications/:certId" element={<CertView/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
