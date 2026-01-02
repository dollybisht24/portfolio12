import React, { useState, useEffect } from 'react'
import { X, Eye } from 'lucide-react'

function asset(path){
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

const UDACITY_IMAGE = 'https://media.discordapp.net/attachments/1365924837087772684/1454711245255999558/image.png?ex=695214ec&is=6950c36c&hm=5ea3bd4e0c1a395ebd6f3636a6b45da90dc1267890d169c36d4bb214669888cd&=&format=webp&quality=lossless&width=1164&height=895'

function CertCard({title, issuer, onView, image, bgImage}){
  return (
    <div className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {bgImage ? (
        <img
          src={bgImage}
          alt="bg"
          className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2 w-1/2 max-w-[320px] opacity-20 pointer-events-none object-contain"
        />
      ) : null}

      <div className="relative flex flex-col items-start">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
            {/* professional icon / logo placeholder */}
            <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L20 8v8l-8 6-8-6V8l8-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
      <div className="relative w-full max-w-[95%] p-4 flex items-center justify-center" onClick={(e)=>e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-[110] bg-white/90 text-slate-900 rounded-full p-2 hover:bg-red-50 hover:text-red-600 transition-colors shadow">
          <X className="w-5 h-5" />
        </button>

        <div className="bg-transparent rounded-md shadow-lg max-h-[90vh] w-full overflow-y-auto flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-inner border-8 border-white">
            <img src={src} alt="Certificate" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Certifications(){
  const [selectedCert, setSelectedCert] = useState(null)
  const UDACITY_LOCAL = asset('/certificates/udacity.png')

  const certs = [
    {title: 'Udacity Machine Learning Course', issuer: 'Udacity', image: UDACITY_LOCAL || UDACITY_IMAGE, bgImage: asset('/certificates/udacity-logo.png'), original: 'https://www.udacity.com/certificate/e/0a8fda46-58fa-11f0-ac03-5310f9337344'},
    {title: 'IAYP International Award', issuer: 'IAYP', image: 'https://media.discordapp.net/attachments/1365924837087772684/1453689514320203928/1766656981122.jpg?ex=6951a91c&is=6950579c&hm=7ceacb7f03713a1893092fe2afeb5460ee3894a44bf03ad9d1bc9088c44ebcd8&=&format=webp&width=671&height=895', bgImage: asset('/certificates/iayp.jpg'), original: null}
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
