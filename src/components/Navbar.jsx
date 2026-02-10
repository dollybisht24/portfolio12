import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Navbar(){
  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-slate-100 h-20 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
        <div className="text-xl font-semibold text-slate-900">Dolly Bisht</div>
        <div className="hidden md:flex gap-6">
          <NavLink to="/" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900'} hover:text-indigo-600 transition-colors`
          }>Home</NavLink>
          <NavLink to="/about" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900'} hover:text-indigo-600 transition-colors`
          }>About</NavLink>
          <NavLink to="/skills" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900'} hover:text-indigo-600 transition-colors`
          }>Skills</NavLink>
          <NavLink to="/education" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900'} hover:text-indigo-600 transition-colors`
          }>Education</NavLink>
          <NavLink to="/certifications" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900'} hover:text-indigo-600 transition-colors`
          }>Certifications</NavLink>
          <NavLink to="/projects" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900'} hover:text-indigo-600 transition-colors`
          }>Projects</NavLink>
          <NavLink to="/contact" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900'} hover:text-indigo-600 transition-colors`
          }>Contact</NavLink>
        </div>
        <div className="md:hidden">
          <button className="p-2 rounded-md bg-slate-800 text-white"><Menu /></button>
        </div>
      </div>
    </nav>
  )
}
