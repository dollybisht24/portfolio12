import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'

export default function Navbar(){
  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-slate-100 h-20 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
        <div className="text-xl font-semibold">Dolly Bisht</div>
        <div className="hidden md:flex gap-6">
          <NavLink to="/" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900 dark:text-white'} hover:text-blue-600`
          }>Home</NavLink>
          <NavLink to="/about" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900 dark:text-white'} hover:text-blue-600`
          }>About</NavLink>
          <NavLink to="/skills" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900 dark:text-white'} hover:text-blue-600`
          }>Skills</NavLink>
          <NavLink to="/education" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900 dark:text-white'} hover:text-blue-600`
          }>Education</NavLink>
          <NavLink to="/certifications" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900 dark:text-white'} hover:text-blue-600`
          }>Certifications</NavLink>
          <NavLink to="/projects" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900 dark:text-white'} hover:text-blue-600`
          }>Projects</NavLink>
          <NavLink to="/contact" className={({isActive})=>
            `font-bold ${isActive? 'text-indigo-600' : 'text-slate-900 dark:text-white'} hover:text-blue-600`
          }>Contact</NavLink>
        </div>
        <div className="md:hidden">
          <button className="p-2 rounded-md bg-slate-800 text-white"><Menu /></button>
        </div>
      </div>
    </nav>
  )
}
