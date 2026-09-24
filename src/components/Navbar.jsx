import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { to: '/', hash: '#hero', label: 'Home' },
    { to: '/about', hash: '#about', label: 'About' },
    { to: '/skills', hash: '#skills', label: 'Skills' },
    { to: '/education', hash: '#education', label: 'Education' },
    { to: '/certifications', hash: '#certifications', label: 'Certifications' },
    { to: '/experience', hash: '#experience', label: 'Experience' },
    { to: '/projects', hash: '#projects', label: 'Projects' },
    { to: '/contact', hash: '#contact', label: 'Contact' }
  ]

  function handleClick(e, link){
    if (location.pathname === '/') {
      e.preventDefault()
      if (link.hash === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(link.hash.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on another route, navigate to the anchor on home
      e.preventDefault()
      navigate('/' + link.hash)
    }
    setOpen(false)
  }

  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-slate-100 h-20 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
        <NavLink 
          to="/" 
          onClick={(e) => handleClick(e, { hash: '#hero' })} 
          className="text-xl font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
        >
          Dolly Bisht
        </NavLink>
        <div className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={location.pathname === '/' ? link.hash : link.to}
              onClick={(e) => handleClick(e, link)}
              className="font-bold text-slate-900 hover:text-indigo-600 transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button 
            type="button" 
            onClick={() => setOpen(!open)} 
            className="p-2 rounded-md bg-slate-800 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-white border-b border-slate-200 shadow-xl py-6 px-6">
          <div className="flex flex-col space-y-3">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={location.pathname === '/' ? link.hash : link.to}
                onClick={(e) => handleClick(e, link)}
                className="px-3 py-2 rounded-lg font-bold text-sm text-slate-900 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
