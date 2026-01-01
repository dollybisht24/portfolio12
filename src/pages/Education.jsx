import React from 'react'
import { Medal, Trophy } from 'lucide-react'

export default function Education(){
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <h2 className="text-6xl font-black text-slate-900">Education</h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* BCA Card - Primary */}
          <article className="bg-white border-l-8 border-indigo-600 p-10 rounded-xl shadow-xl shadow-slate-200/50 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-slate-900">Bachelor of Computer Applications (BCA) - 3-Year Full Scholar</h3>
            <div className="mt-2 text-sm text-slate-700">Institution: Eternal University (Partnered with NavGurukul)</div>

            <div className="mt-6 text-slate-700 space-y-4">
              <p><span className="font-semibold text-slate-900">Core focus areas:</span> Data Structures & Algorithms, Python Programming, Database Management</p>
              <p className="font-medium text-slate-900">Achievement: Earning a prestigious 3-year merit-based scholarship for academic excellence.</p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Coursework</h4>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">DSA</span>
                <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">Web Dev</span>
                <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">Python</span>
                <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">DBMS</span>
                <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">OS</span>
              </div>
            </div>
          </article>

          {/* 12th Grade Card */}
          <article className="bg-white border border-slate-100 p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <header>
              <h3 className="text-2xl font-bold text-slate-950">Senior Secondary Education (Class XII)</h3>
              <div className="mt-2 text-sm text-slate-700">Focus: Science Stream (PCM)</div>
            </header>

            <div className="mt-6 space-y-6 text-slate-700">
              <div className="flex items-start gap-4">
                <div className="bg-amber-50 text-amber-600 p-2 rounded-lg"><Medal /></div>
                <div>
                  <div className="font-semibold text-slate-950">Achieved 1st Rank in Academic Performance (71%)</div>
                  <div className="mt-1 text-sm text-slate-700">Built a strong analytical foundation for higher studies in computer science and algorithmic problem solving.</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg"><Trophy /></div>
                <div>
                  <div className="font-semibold text-slate-950">Active Athlete & Sports Representative</div>
                  <div className="mt-1 text-sm text-slate-700">Developed teamwork, discipline, and physical resilience through competitive sports participation.</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                <span className="bg-slate-50 text-slate-700 font-bold px-4 py-1 rounded-full text-sm">Analytical Thinking</span>
                <span className="bg-slate-50 text-slate-700 font-bold px-4 py-1 rounded-full text-sm">Advanced Mathematics</span>
                <span className="bg-slate-50 text-slate-700 font-bold px-4 py-1 rounded-full text-sm">Team Leadership</span>
                <span className="bg-slate-50 text-slate-700 font-bold px-4 py-1 rounded-full text-sm">Resilience</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
