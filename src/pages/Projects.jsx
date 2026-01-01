import React from 'react'
import { ExternalLink, Github } from 'lucide-react'

const projectsData = [
  {
    id: 1,
    title: 'Interactive Quiz App',
    description: 'Developed a dynamic, API-driven testing platform featuring complex state management for timed rounds, category filtering, and real-time scoring. Focused on providing a seamless, high-performance user experience.',
    image: 'https://outgrow.co/blog/wp-content/uploads/2021/02/interactive-quiz.jpg',
    tags: ['React', 'API', 'Frontend'],
    liveLink: 'https://quiz12as.netlify.app/',
    githubLink: 'https://github.com/dollybisht24/quiz'
  },
  {
    id: 2,
    title: 'Simple Blog Feed',
    description: 'A robust CRUD application for content creators. Implemented optimistic UI rendering and clean architectural patterns to handle real-time post creation, editing, and deletion with zero latency.',
    image: 'https://www.shutterstock.com/image-photo/young-female-travel-blogger-sitting-260nw-1500799619.jpg',
    tags: ['React', 'CRUD', 'Frontend'],
    liveLink: 'https://blog21313.netlify.app/',
    githubLink: 'https://github.com/dollybisht24/Blog'
  },
  {
    id: 3,
    title: 'FlavorFind (Food App)',
    description: 'Engineered a culinary search engine utilizing a RESTful API. Features advanced dietary filtering, nutritional breakdowns, and persistent "Favorites" storage using LocalStorage. Optimized for mobile-first kitchen use.',
    image: 'https://www.muttaharfarooq.com/img/recipeLogo.jpg',
    tags: ['API', 'LocalStorage', 'Frontend'],
    liveLink: 'https://recat23.netlify.app/',
    githubLink: 'https://github.com/dollybisht24/React'
  },
  {
    id: 4,
    title: 'Task Management System',
    description: 'A productivity powerhouse with integrated drag-and-drop functionality. Features advanced category filtering and persistent data synchronization to help users track progress through a professional, minimalist interface.',
    image: 'https://plus.unsplash.com/premium_photo-1681487870238-4a2dfddc6bcb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG8lMjBkbyUyMGxpc3R8ZW58MHx8MHx8fDA%3D',
    tags: ['React', 'DragDrop', 'Tools'],
    liveLink: 'https://todo1gr.netlify.app/',
    githubLink: 'https://github.com/dollybisht24/To-do-list'
  }
]

function badgeClass(tag){
  const t = tag.toLowerCase()
  if(t === 'react' || t === 'frontend') return 'bg-blue-100 text-blue-700'
  if(t === 'api' || t === 'apis' || t === 'restful') return 'bg-green-100 text-green-700'
  return 'bg-purple-100 text-purple-700'
}

export default function Projects(){
  return (
    <section className="bg-slate-50 py-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
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
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-primary flex-1 inline-flex items-center justify-center gap-2">
                  <ExternalLink size={18} /> Live Demo
                </a>
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-outline flex-1 inline-flex items-center justify-center gap-2">
                  <Github size={18} /> GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
