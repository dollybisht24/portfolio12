import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import profileImage from '../assets/dolly-portrait.jpg'

// Sub-pages to display sequentially as user scrolls down
import About from './About'
import Skills from './Skills'
import Education from './Education'
import Certifications from './Certifications'
import InternshipExperience from './InternshipExperience'
import Projects from './Projects'
import Contact from './Contact'

const techItems = [
  { key: 'react', label: 'React.js', short: 'R', bgClass: 'bg-indigo-50', textClass: 'text-indigo-600' },
  { key: 'node', label: 'Node.js', short: 'N', bgClass: 'bg-emerald-50', textClass: 'text-emerald-700' },
  { key: 'express', label: 'Express.js', short: 'Ex', bgClass: 'bg-slate-100', textClass: 'text-slate-800' },
  { key: 'mongo', label: 'MongoDB', short: 'M', bgClass: 'bg-green-50', textClass: 'text-green-700' },
  { key: 'api', label: 'REST APIs', short: 'API', bgClass: 'bg-purple-50', textClass: 'text-purple-700' },
  { key: 'js', label: 'JavaScript (ES6+)', short: 'JS', bgClass: 'bg-yellow-50', textClass: 'text-yellow-700' },
  { key: 'html', label: 'HTML5', short: 'H', bgClass: 'bg-orange-50', textClass: 'text-orange-600' },
  { key: 'css', label: 'CSS3', short: 'C', bgClass: 'bg-blue-50', textClass: 'text-blue-600' },
  { key: 'tw', label: 'Tailwind CSS', short: 'TW', bgClass: 'bg-cyan-50', textClass: 'text-cyan-600' },
  { key: 'py', label: 'Python', short: 'Py', bgClass: 'bg-sky-50', textClass: 'text-sky-700' },
  { key: 'git', label: 'Git', short: 'Git', bgClass: 'bg-red-50', textClass: 'text-red-600' }
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
}
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export default function Home(){
  const location = useLocation()

  // Handle smooth scroll when URL has a hash (e.g. /#projects, /#about)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }
  }, [location])

  // Public-folder direct-download using PUBLIC_URL (with safe fallback)
  const publicBase = (typeof process !== 'undefined' && process.env && process.env.PUBLIC_URL)
    ? process.env.PUBLIC_URL
    : (import.meta && import.meta.env && import.meta.env.BASE_URL) || '/'

  function handleDownload(e){
    e && e.preventDefault()
    const fileUrl = `${publicBase.replace(/\/$/, '')}/Resume.pdf`

    try{
      const a = document.createElement('a')
      a.href = fileUrl
      a.setAttribute('download', 'Dolly_Bisht_Resume.pdf')
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      setTimeout(() => a.remove(), 50)
    }catch(err){
      console.error('Download failed, opening in new tab:', err)
      window.open(fileUrl, '_blank')
    }
  }

  function scrollToSection(id) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-white">
        <div className="absolute -left-24 -top-24 w-72 h-72 bg-indigo-300 rounded-full bg-blob" style={{opacity:0.08}} />
        <div className="absolute right-[-6rem] top-24 w-96 h-96 bg-emerald-300 rounded-full bg-blob" style={{opacity:0.06}} />

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[60vh] gap-12">
            <motion.div initial="hidden" animate="show" variants={container} className="space-y-8">
              <motion.h1 variants={item} className="text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
                <span className="text-slate-950">Full Stack </span>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Developer</span>
              </motion.h1>
              <motion.p variants={item} className="text-xl text-slate-700 max-w-2xl">
                Hi, I'm Dolly Bisht, a BCA student at Eternal University and a passionate Full Stack Developer. I specialize in building responsive, scalable, and user-friendly web applications using React, Node.js, Express, MongoDB, and modern AI tools. I combine strong academic knowledge with hands-on development experience to build innovative and impactful web solutions.
              </motion.p>

              <motion.div variants={item} className="flex items-center gap-4">
                <button 
                  type="button" 
                  onClick={() => scrollToSection('projects')} 
                  className="btn-primary"
                >
                  <span>View My Work</span>
                  <ExternalLink size={16} />
                </button>
                <button type="button" onClick={handleDownload} className="btn-outline">
                  <span>Download CV</span>
                </button>
              </motion.div>

              <motion.div variants={item} className="mt-6">
                <div className="text-sm font-medium text-slate-900">Core Toolkit</div>
                <div className="mt-6 overflow-hidden">
                  <div className="marquee" role="list" aria-label="Core Toolkit marquee">
                    {techItems.concat(techItems).map((t, i) => (
                      <div
                        key={`${t.key}-${i}`}
                        role="listitem"
                        aria-hidden={i >= techItems.length}
                        className={`transform transition-transform duration-200 hover:scale-110 inline-flex items-center mr-6 rounded-full text-lg font-bold px-8 py-3 border border-slate-100 ${t.bgClass} ${t.textClass}`}
                      >
                        <span className="whitespace-nowrap">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{opacity:0, x:30}} animate={{opacity:1, x:0}} transition={{delay:0.2}} className="flex justify-center lg:justify-end">
              <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] flex items-center justify-center">
                <div className="relative w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full bg-white shadow-2xl overflow-hidden flex items-center justify-center">
                  <img src={profileImage} alt="Dolly profile" className="w-full h-full object-cover object-top scale-110" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-t border-slate-100">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills" className="border-t border-slate-100">
        <Skills />
      </section>

      {/* Education Section */}
      <section id="education" className="border-t border-slate-100">
        <Education />
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="border-t border-slate-100">
        <Certifications />
      </section>

      {/* Experience Section */}
      <section id="experience" className="border-t border-slate-100">
        <InternshipExperience />
      </section>

      {/* Projects Section */}
      <section id="projects" className="border-t border-slate-100">
        <Projects />
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-slate-100">
        <Contact />
      </section>
    </div>
  )
}
