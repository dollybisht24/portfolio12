import React from 'react'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-[#020617] text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top section - the spread */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-xl font-extrabold">Dolly Bisht</div>
                <div className="text-sm text-slate-400">2nd year BCA Scholar</div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="inline-block w-3 h-3 rounded-full bg-emerald-400" aria-hidden="true" />
                <span className="text-sm text-emerald-300">Available for Internships</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-400 max-w-md">I build accessible, responsive frontends and enjoy turning ideas into delightful user experiences.</p>
          </div>

          {/* Center - navigation */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center">
              <li><Link to="/" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link to="/skills" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors">Skills</Link></li>
              <li><Link to="/education" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors">Education</Link></li>
              <li><Link to="/projects" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-300 hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </nav>

          {/* Right - social icons */}
          <div className="flex flex-col items-end sm:items-end gap-3">
            <div className="flex items-center gap-3">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 bg-slate-800 rounded-full text-white hover:bg-indigo-600 transition-all transform hover:scale-110">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 bg-slate-800 rounded-full text-white hover:bg-indigo-600 transition-all transform hover:scale-110">
                <Github size={20} />
              </a>
              <a href="mailto:hello@example.com" aria-label="Email" className="p-3 bg-slate-800 rounded-full text-white hover:bg-indigo-600 transition-all transform hover:scale-110">
                <Mail size={20} />
              </a>
            </div>
            <p className="mt-2 text-sm text-slate-400">Open to collaborations, internships & freelance work.</p>
          </div>
        </div>

        {/* Bottom section - credits */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500 text-center sm:text-left">© 2025 Dolly Bisht. Handcrafted with React & Passion.</div>
            <div className="text-sm text-slate-500 text-center sm:text-right">Built with ❤️ · <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-2">Vite <ExternalLink size={14} /></a></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
