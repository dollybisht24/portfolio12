import React, { useState, useEffect } from 'react'
import { X, Eye } from 'lucide-react'

// Prefer bundling images from src so Vite rewrites and fingerprints them for production.
import udacityLocal from '../assets/certificates/udacity.png'
import udacityLogoLocal from '../assets/certificates/udacity-logo.png'
import udacityLogo from '../assets/certificates/udacity-logo.png'
import iaypBg from '../assets/certificates/iayp.jpg'
import iaypLogo from '../assets/iayp-logo.png'

function asset(path){
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

const UDACITY_IMAGE = 'https://media.discordapp.net/attachments/1365924837087772684/1454711245255999558/image.png?ex=695214ec&is=6950c36c&hm=5ea3bd4e0c1a395ebd6f3636a6b45da90dc1267890d169c36d4bb214669888cd&=&format=webp&quality=lossless&width=1164&height=895'

function CertCard({title, issuer, onView, image, bgImage, boxImage}){
  return (
    <div className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {bgImage ? (
        <img
          src={bgImage}
          alt="bg"
          className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2 w-1/2 max-w-[320px] opacity-10 pointer-events-none object-contain"
        />
      ) : null}

      <div className="relative flex flex-col items-start">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden">
            {boxImage ? (
              <img src={boxImage} alt={`${title} logo`} className="w-8 h-8 object-contain" />
            ) : (
              <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L20 8v8l-8 6-8-6V8l8-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </div>
        </div>

        <h4 className="text-slate-900 font-bold text-lg">{title}</h4>
        <div className="text-sm text-slate-500 mt-2">{issuer}</div>

        <div className="mt-6 w-full">
          {image ? (
            <button onClick={onView} className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-200/50">
              <Eye className="w-4 h-4" />
              View Certificate
            </button>
          ) : (
            <button className="inline-flex items-center gap-2 bg-slate-200 text-slate-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed" disabled>
              <Eye className="w-4 h-4" />
              View Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Modal({src, onClose}){
  useEffect(()=>{
    function onKey(e){ if(e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[95%] p-4 flex items-center justify-center overflow-visible" onClick={(e)=>e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 9999, cursor: 'pointer' }}
          className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition-shadow shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-transparent rounded-md shadow-lg max-h-[80vh] w-full flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-inner border-8 border-white max-w-[90%]">
            <img src={src} alt="Certificate" className="max-w-[90%] max-h-[80vh] w-auto h-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Certifications(){
  const [selectedCert, setSelectedCert] = useState(null)

  // Use imported assets first (handled by Vite). Fall back to public/ paths if necessary.
  const udacityAsset = udacityLocal || asset('/certificates/udacity.png')
  const udacityLogoAsset = udacityLogoLocal || asset('/certificates/udacity-logo.png')
  const iaypAsset = iaypBg || asset('/certificates/iayp.jpg')

  const certs = [
    {title: 'Udacity Machine Learning Course', issuer: 'Udacity', image: udacityAsset || UDACITY_IMAGE, bgImage: udacityLogoAsset, original: 'https://www.udacity.com/certificate/e/0a8fda46-58fa-11f0-ac03-5310f9337344'},
    {title: 'IAYP International Award', issuer: 'IAYP', image: iaypAsset, bgImage: iaypLogo, boxImage: null, original: null}
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold text-slate-900">Certifications</h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map(c => (
          <div key={c.title}>
            <CertCard {...c} onView={() => c.image ? setSelectedCert(c) : null} />
            <div className="mt-2 text-sm text-slate-500">{c.original ? <a href={c.original} target="_blank" rel="noopener noreferrer" className="text-indigo-600">Open original</a> : null}</div>
          </div>
        ))}
      </div>

      {selectedCert && selectedCert.image && (
        <Modal src={selectedCert.image} onClose={() => setSelectedCert(null)} />
      )}
    </section>
  )
}
