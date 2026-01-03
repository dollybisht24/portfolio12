import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

// Import certificates
import udacityLocal from '../assets/certificates/udacity.png'
import iaypLocal from '../assets/certificates/iayp.jpg'

function asset(path){
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

const certificates = {
  udacity: {
    title: 'Introducing Generative AI with AWS',
    issuer: 'Udacity',
    image: udacityLocal || asset('/certificates/udacity.png'),
    original: 'https://www.udacity.com/certificate/e/0a8fda46-58fa-11f0-ac03-5310f9337344'
  },
  iayp: {
    title: 'Duke of Edinburgh International Award',
    issuer: 'IAYP',
    image: iaypLocal || asset('/certificates/iayp.jpg'),
    original: null
  }
}

export default function CertView(){
  const { certId } = useParams()
  const navigate = useNavigate()
  const cert = certificates[certId]

  if (!cert) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Certificate not found</h2>
          <button onClick={() => navigate('/certifications')} className="mt-4 btn-primary">Back to Certifications</button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-black flex flex-col">
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate('/certifications')}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <img src={cert.image} alt={cert.title} className="w-[90%] h-auto object-contain" />
      </div>
    </section>
  )
}
