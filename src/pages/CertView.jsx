import React from 'react'
import { DownloadCloud } from 'lucide-react'

// Import the certificate so Vite includes and rewrites it for production
import udacityLocal from '../assets/certificates/udacity.png'

const UDACITY_URL = 'https://www.udacity.com/certificate/e/0a8fda46-58fa-11f0-ac03-5310f9337344'

function asset(path){
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export default function CertView(){
  const imagePath = udacityLocal || asset('/certificates/udacity.png')

  const handleShare = async () => {
    const shareUrl = UDACITY_URL
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Udacity Certificate', url: shareUrl })
      } catch (err) {
        // user cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl)
      alert('Certificate link copied to clipboard')
    } else {
      alert('Share not supported in this browser')
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-slate-900">Udacity Machine Learning Certificate</h2>
      <p className="text-slate-700 mt-2">Preview below — you can download the image, open the original certificate, or share the link.</p>

      <div className="mt-6 bg-white border rounded-md overflow-hidden">
        <img src={imagePath} alt="Udacity Certificate" className="w-full h-auto object-contain" />
      </div>

      <div className="mt-4 flex gap-3">
        <a href={imagePath} download className="btn-primary inline-flex items-center gap-2">
          <span>Download Image</span>
          <DownloadCloud size={16} />
        </a>
        <a href={UDACITY_URL} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
          <span>Open Original</span>
        </a>
        <button onClick={handleShare} className="btn-outline inline-flex items-center gap-2">Share / Copy Link</button>
      </div>
    </section>
  )
}
