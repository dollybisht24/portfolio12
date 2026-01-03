import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Printer, Loader2 } from 'lucide-react'

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
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = cert.image
    link.download = `${cert.title.replace(/\s+/g, '_')}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    window.print()
  }

  if (!cert) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Certificate not found</h2>
          <p className="text-slate-600 mb-6">The certificate you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/certifications')} 
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Certifications
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 relative">
      {/* Radial gradient overlay for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(148,163,184,0.1)_100%)] pointer-events-none"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back Button */}
            <button
              onClick={() => navigate('/certifications')}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-slate-700 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border border-slate-200/50"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Center: Logo/Brand */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl font-bold text-slate-900">Dolly Bisht</h1>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                title="Print Certificate"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                title="Download Certificate"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Certificate Display */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Certificate Container */}
          <div className="relative group">
            {/* Shimmer/Gloss Overlay Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
            
            {/* Loading State */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg border border-slate-200 shadow-2xl">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Loading certificate...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {imageError && (
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Failed to load certificate</h3>
                <p className="text-slate-600 mb-6">There was an error loading the certificate image.</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Certificate Image */}
            <div className={`relative bg-white rounded-lg border border-slate-200 shadow-2xl overflow-hidden transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              {/* Subtle paper texture overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmOWZhZmIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-30 pointer-events-none"></div>
              
              <img 
                src={cert.image} 
                alt={cert.title}
                className="relative w-full h-auto object-contain"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={{ imageRendering: 'high-quality' }}
              />
            </div>

            {/* Certificate Info */}
            {imageLoaded && (
              <div className="mt-6 text-center animate-fadeIn">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{cert.title}</h2>
                <p className="text-slate-600 mb-4">Issued by {cert.issuer}</p>
                {cert.original && (
                  <a 
                    href={cert.original} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Verify on {cert.issuer} website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          header, .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
          .shadow-2xl {
            box-shadow: none !important;
          }
        }
      `}</style>
    </section>
  )
}
