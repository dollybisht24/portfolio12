import React from 'react'
import { Link } from 'react-router-dom'
import { Eye, Calendar, MapPin, CheckCircle2 } from 'lucide-react'

const internships = [
  {
    id: 'curelystics',
    role: 'Frontend Developer Intern',
    company: 'Curelystics Technologies',
    period: '19 March 2026 – 19 June 2026 (3 Months)',
    location: 'Kota, Rajasthan / Hybrid',
    badge: 'Healthcare Management & OPD Platform',
    summary: 'Contributed directly to the frontend engineering of an AI-powered OPD and Hospital Management platform. Built responsive interfaces, optimized user flows, and collaborated with design and backend teams.',
    responsibilities: [
      'Developed and maintained responsive frontend modules using React.js, JavaScript (ES6+), HTML5, and CSS3.',
      'Contributed to the design and development of the company web application, ensuring mobile responsiveness across all device viewports.',
      'Worked on interface modules for administrative and nurse dashboards to manage real-time patient queues and vitals.',
      'Integrated backend REST APIs with frontend state management for scheduling and patient records.',
      'Collaborated with design and engineering teams through Figma handoffs and Git/GitHub code reviews.',
      'Utilized AI-assisted engineering practices to accelerate UI component development and workflow testing.'
    ],
    tools: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'REST APIs', 'Git & GitHub', 'Figma'],
    certRoute: '/certifications/curelystics'
  },
  {
    id: 'cloudwaves',
    role: 'React.js Developer Intern',
    company: 'CloudWaves Private Limited',
    period: '03 January 2026 – 07 February 2026',
    location: 'Remote',
    badge: 'Early-Stage Startup',
    summary: 'Worked on frontend development tasks for an early-stage tech startup, building reusable modular components, integrating APIs, and improving user interface responsiveness.',
    responsibilities: [
      'Built modular, reusable UI components using React.js and modern JavaScript standards.',
      'Integrated backend REST APIs to dynamically populate dashboards and interactive data views.',
      'Refined interface layout consistency, cross-browser compatibility, and mobile responsiveness.',
      'Coordinated with team leads to deliver sprint features and implement code review feedback.'
    ],
    tools: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Git'],
    liveLink: null,
    certRoute: '/certifications/cloudwaves'
  }
]

export default function InternshipExperience(){
  return (
    <section className="bg-slate-50 py-32 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <header className="mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100 inline-block mb-3">
            Professional Experience
          </span>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-heading">
            Internship Experience
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
            Professional software development experience working on healthcare operations platforms, startup applications, and team engineering workflows.
          </p>
        </header>

        {/* Experience Cards */}
        <div className="space-y-12">
          {internships.map(exp => (
            <article 
              key={exp.id} 
              className="bg-white rounded-[2rem] border border-slate-100 p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 inline-block mb-2">
                    {exp.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
                    {exp.role}
                  </h3>
                  <div className="text-lg font-semibold text-slate-700 mt-1">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-col md:items-end text-xs sm:text-sm text-slate-500 space-y-1">
                  <span className="inline-flex items-center gap-1.5 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Calendar size={14} className="text-indigo-600" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>
              </div>

              <p className="mt-6 text-base text-slate-700 leading-relaxed">
                {exp.summary}
              </p>

              {/* Responsibilities */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Key Responsibilities & Contributions:
                </h4>
                {exp.responsibilities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                    <CheckCircle2 size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tools & Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {exp.tools.map((tool, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Link 
                    to={exp.certRoute} 
                    className="btn-outline inline-flex items-center gap-2 text-sm"
                  >
                    <Eye size={16} />
                    <span>View Certificate</span>
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
