import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const techItems = [
  { key: 'html', label: 'HTML5', short: 'H', bgClass: 'bg-orange-50', textClass: 'text-orange-600' },
  { key: 'css', label: 'CSS3', short: 'C', bgClass: 'bg-blue-50', textClass: 'text-blue-600' },
  { key: 'js', label: 'JavaScript (ES6+)', short: 'JS', bgClass: 'bg-yellow-50', textClass: 'text-yellow-700' },
  { key: 'react', label: 'React.js', short: 'R', bgClass: 'bg-indigo-50', textClass: 'text-indigo-600' },
  { key: 'py', label: 'Python', short: 'Py', bgClass: 'bg-sky-50', textClass: 'text-sky-700' },
  { key: 'tw', label: 'Tailwind CSS', short: 'TW', bgClass: 'bg-cyan-50', textClass: 'text-cyan-600' },
  { key: 'git', label: 'Git', short: 'Git', bgClass: 'bg-red-50', textClass: 'text-red-600' }
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } }
}
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

export default function Home(){
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
      // append, trigger, cleanup
      document.body.appendChild(a)
      // attempt to trigger click; some browsers require mouse events
      a.click()
      // small safety: ensure anchor removed
      setTimeout(() => a.remove(), 50)
    }catch(err){
      console.error('Download failed, opening in new tab:', err)
      window.open(fileUrl, '_blank')
    }
  }
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-24 -top-24 w-72 h-72 bg-indigo-300 rounded-full bg-blob" style={{opacity:0.08}} />
      <div className="absolute right-[-6rem] top-24 w-96 h-96 bg-emerald-300 rounded-full bg-blob" style={{opacity:0.06}} />

      <div className="max-w-7xl mx-auto px-6 py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[90vh] gap-12">
          <motion.div initial="hidden" animate="show" variants={container} className="space-y-8">
            <motion.h1 variants={item} className="text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
              <span className="text-slate-950">Frontend </span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Developer</span>
            </motion.h1>
            <motion.p variants={item} className="text-xl text-slate-700 max-w-2xl">Hi, I'm Dolly Bisht, a BCA student at Eternal University and a passionate Frontend Developer. I specialize in creating responsive, visually engaging, and user-friendly web applications. I combine strong academic knowledge with hands-on development experience to build innovative and impactful web solutions.</motion.p>

            <motion.div variants={item} className="flex items-center gap-4">
              <Link to="/projects" className="btn-primary">
                <span>View My Work</span>
                <ExternalLink size={16} />
              </Link>
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
                <img src="/images/Dolly1-fixed.jpg" alt="Dolly profile" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
