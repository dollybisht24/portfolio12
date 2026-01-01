import React, {useEffect} from 'react'

export default function CertRedirect(){
  useEffect(()=>{
    // Redirect to the external Udacity certificate
    window.location.href = 'https://www.udacity.com/certificate/e/0a8fda46-58fa-11f0-ac03-5310f9337344'
  },[])

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold">Redirecting to certificate...</h2>
      <p className="mt-4 text-slate-700">If you are not redirected, <a href="https://www.udacity.com/certificate/e/0a8fda46-58fa-11f0-ac03-5310f9337344" className="text-indigo-600" target="_blank" rel="noopener noreferrer">click here to view the Udacity certificate</a>.</p>
    </section>
  )
}
