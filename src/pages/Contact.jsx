import React, { useState } from 'react'
import { Mail, MapPin, Linkedin, Github } from 'lucide-react'

export default function Contact(){
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function validate(){
    const e = {}
    if(!form.name.trim()) e.name = 'Name is required'
    if(!form.email.trim()) e.email = 'Email is required'
    else if(!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email)) e.email = 'Enter a valid email'
    if(!form.message.trim()) e.message = 'Message is required'
    return e
  }

  async function handleSubmit(e){
    e.preventDefault()
    const eobj = validate()
    setErrors(eobj)
    if(Object.keys(eobj).length === 0){
      setLoading(true)
      try{
        const resp = await fetch('https://formspree.io/f/mjgvyvvr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ name: form.name, email: form.email, message: form.message })
        })

        if(!resp.ok){
          const body = await resp.json().catch(()=>null)
          const msg = body && body.error ? body.error : 'Failed to send message. Please try again later.'
          throw new Error(msg)
        }

        setSuccess(true)
        setForm({ name: '', email: '', message: '' })
        setErrors({})
        setTimeout(()=> setSuccess(false), 5000)
      }catch(err){
        setErrors({ submit: 'Failed to send message. Please try again later.' })
      }finally{
        setLoading(false)
      }
    }
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Contact Form */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-extrabold text-slate-900">Send a Message</h2>
          <p className="mt-2 text-slate-600">I&apos;m available for freelance work and collaborations — send a quick message and I&apos;ll reply soon.</p>

          {success && (
            <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
              Message sent successfully. Thank you!
            </div>
          )}

          <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-sm font-bold text-slate-900">Name</span>
              <input
                value={form.name}
                onChange={e=> setForm({...form, name: e.target.value})}
                className={`mt-2 w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-slate-200'} focus:border-indigo-500 outline-none`}
                placeholder="Your full name"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-900">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={e=> setForm({...form, email: e.target.value})}
                className={`mt-2 w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-slate-200'} focus:border-indigo-500 outline-none`}
                placeholder="you@example.com"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-900">Message</span>
              <textarea
                rows={6}
                value={form.message}
                onChange={e=> setForm({...form, message: e.target.value})}
                className={`mt-2 w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-400' : 'border-slate-200'} focus:border-indigo-500 outline-none`}
                placeholder="How can I help you?"
                required
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </label>

            <button type="submit" disabled={loading} className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? 'Sending...' : (
                <>
                  <span>Send Message</span>
                </>
              )}
            </button>
            {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}
          </form>
        </div>

        {/* Right: Get In Touch Info */}
        <aside className="px-4">
          <h2 className="text-4xl font-extrabold text-slate-900">Let&apos;s Connect</h2>
          <p className="mt-4 text-slate-600">Prefer direct contact? Use one of the actions below to reach out.</p>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
              <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
                <Mail />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Email</div>
                <a href="mailto:dollybisht408@gmail.com" className="text-slate-600">dollybisht408@gmail.com</a>
              </div>
            </div>

            <a href="https://www.linkedin.com/in/dolly-bisht-6584b6399/" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-[#0A66C2] text-white p-4 rounded-xl shadow">
              <div className="p-3 rounded-lg bg-white/10">
                <Linkedin />
              </div>
              <div>
                <div className="text-sm font-bold">LinkedIn</div>
                <div className="text-sm opacity-90">Connect on LinkedIn</div>
              </div>
            </a>

            <a href="https://github.com/dollybisht24" target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-slate-900 text-white p-4 rounded-xl shadow">
              <div className="p-3 rounded-lg bg-white/10">
                <Github />
              </div>
              <div>
                <div className="text-sm font-bold">GitHub</div>
                <div className="text-sm opacity-90">View repositories</div>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
              <div className="p-3 rounded-lg bg-rose-50 text-rose-600">
                <MapPin />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Location</div>
                <div className="text-sm text-slate-600">Himachal Pradesh, India</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
