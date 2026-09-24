import React from 'react'
import { ExternalLink, Github } from 'lucide-react'

// Import local project assets
import nykaaImage from '../assets/projects/nykaa-clone.png'

const projectsData = [
  {
    id: 1,
    title: 'Nykaa Clone',
    description: 'A full-stack e-commerce web application replicating modern cosmetic and beauty shopping workflows. Features dynamic product discovery, search filtering, user authentication, stateful cart management, and seamless REST API integration with database persistence.',
    image: nykaaImage,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Frontend'],
    liveLink: 'https://nykaa-clone-frontend.vercel.app',
    githubLink: 'https://github.com/dollybisht24/fullstack_project'
  },
  {
    id: 3,
    title: 'CollabSphere (Workspace & AI)',
    description: 'A collaborative workspace for engineering teams to manage projects, notes, and AI-powered development workflows. Engineered with real-time markdown documentation, sprint task tracking, and Google Gemini API integration.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Full Stack'],
    liveLink: 'https://collab-sphere-phi.vercel.app/',
    githubLink: 'https://github.com/dollybisht24'
  }
]

function badgeClass(tag){
  const t = tag.toLowerCase()
  if(t === 'react' || t === 'frontend') return 'bg-blue-100 text-blue-700'
  if(t === 'api' || t === 'apis' || t === 'restful' || t === 'node.js') return 'bg-green-100 text-green-700'
  if(t === 'mongodb' || t === 'express' || t === 'full stack') return 'bg-emerald-100 text-emerald-800'
  if(t === 'gemini api' || t === 'ai') return 'bg-indigo-100 text-indigo-700'
  return 'bg-purple-100 text-purple-700'
}

export default function Projects(){
  return (
    <section className="bg-slate-50 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">Projects</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
            A selection of projects I've designed and developed using modern full-stack web technologies, REST APIs, and AI integrations.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projectsData.map(project => (
            <article key={project.id} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-indigo-200/50">
              <div className="overflow-hidden">
                <img src={project.image} alt={project.title} className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110" />
              </div>

              <div className="p-10">
                <h3 className="text-2xl font-bold text-slate-900">{project.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{project.description}</p>

                <div className="flex flex-wrap gap-3 mt-6">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className={`text-sm px-3 py-1 rounded-full ${badgeClass(tag)}`}>{tag}</span>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-primary flex-1 inline-flex items-center justify-center gap-2">
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-outline flex-1 inline-flex items-center justify-center gap-2">
                      <Github size={18} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
