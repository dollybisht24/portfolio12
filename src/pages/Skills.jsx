import React from 'react'
import { Monitor, Zap, Code, GitBranch, PenTool, Cpu, Cloud, Layout } from 'lucide-react'

const categories = [
  {
    key: 'frontend',
    title: 'Frontend Excellence',
    skills: [
      {name: 'HTML5', mastery: 68, bg: 'bg-orange-50', text: 'text-orange-600'},
      {name: 'CSS3', mastery: 66, bg: 'bg-blue-50', text: 'text-blue-600'},
      {name: 'JavaScript (ES6+)', mastery: 65, bg: 'bg-yellow-50', text: 'text-yellow-700'},
      {name: 'React.js', mastery: 67, bg: 'bg-indigo-50', text: 'text-indigo-600'}
    ]
  },
  {
    key: 'logic',
    title: 'Programming Logic',
    skills: [
      {name: 'Python', mastery: 66, bg: 'bg-sky-50', text: 'text-sky-700'},
      {name: 'Data Structures & Algorithms (DSA)', mastery: 64, bg: 'bg-amber-50', text: 'text-amber-700'}
    ]
  },
  {
    key: 'tools',
    title: 'Development Tools',
    skills: [
      {name: 'Git', mastery: 65, bg: 'bg-red-50', text: 'text-red-600'},
      {name: 'GitHub', mastery: 64, bg: 'bg-violet-50', text: 'text-violet-600'},
      {name: 'VS Code', mastery: 69, bg: 'bg-slate-50', text: 'text-slate-700'},
      {name: 'Netlify / Vercel', mastery: 62, bg: 'bg-emerald-50', text: 'text-emerald-700'}
    ]
  },
  {
    key: 'design',
    title: 'Design & UX',
    skills: [
      {name: 'Responsive Design', mastery: 67, bg: 'bg-cyan-50', text: 'text-cyan-600'},
      {name: 'DOM Manipulation', mastery: 63, bg: 'bg-rose-50', text: 'text-rose-600'},
      {name: 'UI/UX Principles', mastery: 66, bg: 'bg-indigo-50', text: 'text-indigo-600'}
    ]
  }
]
function getIcon(name){
  const key = name.toLowerCase()
  if(key.includes('html') || key.includes('responsive')) return <Monitor size={16} />
  if(key.includes('css')) return <Code size={16} />
  if(key.includes('javascript') || key.includes('js')) return <Zap size={16} />
  if(key.includes('react')) return <Code size={16} />
  if(key.includes('python')) return <Cpu size={16} />
  if(key.includes('data') || key.includes('dsa')) return <Cpu size={16} />
  if(key.includes('git') || key.includes('github')) return <GitBranch size={16} />
  if(key.includes('vs code') || key.includes('vscode')) return <Monitor size={16} />
  if(key.includes('netlify') || key.includes('vercel')) return <Cloud size={16} />
  if(key.includes('dom') || key.includes('manipulation')) return <Code size={16} />
  if(key.includes('ui') || key.includes('ux') || key.includes('design')) return <PenTool size={16} />
  return <Layout size={16} />
}

function SkillBadge({skill}){
  const name = skill.name.toLowerCase()
  let colorClasses = `${skill.bg} ${skill.text} border border-slate-100`
  if(name.includes('html')) colorClasses = 'bg-orange-50 text-orange-600 border border-orange-100'
  else if(name.includes('react')) colorClasses = 'bg-indigo-50 text-indigo-600 border border-indigo-100'
  else if(name.includes('python')) colorClasses = 'bg-blue-50 text-blue-600 border border-blue-100'
  else if(name.includes('github')) colorClasses = 'bg-purple-50 text-purple-600 border border-purple-100'

  return (
    <div className={`px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-110 flex items-center gap-2 ${colorClasses}`}>
      <span className="p-1.5 rounded-md bg-white/40 flex items-center justify-center">{getIcon(skill.name)}</span>
      <span className="whitespace-nowrap">{skill.name}</span>
    </div>
  )
}

export default function Skills(){
  return (
    <section className="py-32 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-6">
        <h2 className="col-span-1 md:col-span-2 text-6xl font-black text-slate-900 mb-12">Skills</h2>

        {categories.map(cat => (
          <article key={cat.key} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 transform transition duration-500 hover:shadow-2xl hover:-translate-y-2">
            <h3 className="text-2xl font-extrabold text-indigo-600 mb-4">{cat.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">Key competencies and tools used in {cat.title.toLowerCase()}.</p>

            <div className="flex flex-wrap gap-3 mt-auto">
              {cat.skills.map(s => <SkillBadge key={s.name} skill={s} />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
