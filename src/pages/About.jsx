import React from 'react'
import { Monitor, Zap, GitBranch, Users, Code, MessageCircle, Check, GraduationCap, Trophy, Rocket, FileBadge, Briefcase } from 'lucide-react'

export default function About() {
  return (
    <section className="bg-white min-h-screen pt-32 pb-32 lg:pb-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-10 items-start mb-12">
          <div className="lg:col-span-12">
            <p className="text-2xl md:text-3xl text-indigo-600 font-extrabold">About</p>
            <h1 className="mt-4 text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">Hello — I’m Dolly, a Frontend Developer focused on performant, accessible interfaces.</h1>
            <h2 className="sr-only">About Dolly</h2>
            <p className="mt-4 text-lg lg:text-xl text-slate-700 lg:pr-12">I am a BCA student at Himachal Eternal University with a strong focus on Frontend Development. I build accessible, high-performance, and visually engaging web applications using React.js, HTML, CSS, and JavaScript. I also have working knowledge of backend technologies including Node.js and MongoDB, which helps me create well-integrated, scalable solutions.</p>

            <p className="mt-6 text-lg lg:text-xl text-slate-700 lg:pr-12">My approach emphasizes clean code, maintainability, and inclusive user experiences. I believe thoughtful design combined with clear logic and documentation is essential for building reliable digital products. I continuously refine my skills through hands-on projects and self-directed learning.</p>
          </div>

          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8">
            <h2 className="text-5xl font-bold text-slate-900 mb-8">My Journey in Tech</h2>

            <div className="space-y-8 text-lg lg:text-xl text-slate-700">
              <p>
                My journey in technology began as a Scholar supported by NavGurukul, in collaboration with Eternal University and Badrika Ashram, where I am currently pursuing my Bachelor of Computer Applications (BCA). This unique learning ecosystem has shaped my academic foundation while instilling strong values of discipline, self-learning, leadership, and a merit-first approach to personal and professional growth.
              </p>

              <p>
                With a solid grounding in core Computer Science concepts, I have developed a strong interest in Frontend Engineering. Over the past two years, I have gained hands-on experience in HTML5, CSS3, JavaScript, and React.js, while also strengthening my logical and problem-solving skills through Python and Data Structures & Algorithms practice. I enjoy transforming ideas and requirements into clean, scalable, and user-focused solutions.
              </p>

              <p>
                Beyond technical expertise, I am committed to continuous improvement in English communication, teamwork, and professional collaboration, understanding that impactful software is built through effective communication as much as strong code. As a scholar, I have also taken on mentorship and leadership responsibilities, contributing actively to group projects and peer learning initiatives.
              </p>

              <p>
                I am motivated, detail-oriented, and passionate about building meaningful digital experiences while continuously evolving as a software professional.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-white border-l-8 border-indigo-600 p-8 rounded-xl shadow-2xl lg:h-[92vh] lg:overflow-y-auto flex flex-col lg:sticky lg:top-8">
              <h4 className="text-2xl font-bold text-slate-900 mb-6">Quick Achievements</h4>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><GraduationCap /></div>
                  <div>
                    <div className="text-slate-900 font-bold">BCA Scholar</div>
                    <div className="text-slate-600 text-sm">BCA Student | GPA: 7.0 | Eternal University</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><Trophy /></div>
                  <div>
                    <div className="text-slate-900 font-bold">Academic Excellence</div>
                    <div className="text-slate-600 text-sm">71% in 12th Grade (Science Stream)</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><Rocket /></div>
                  <div>
                    <div className="text-slate-900 font-bold">Frontend Expert</div>
                    <div className="text-slate-600 text-sm">Specializing in React.js & Modern UI/UX</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><FileBadge /></div>
                  <div>
                    <div className="text-slate-900 font-bold">Certified</div>
                    <div className="text-slate-600 text-sm">2 Professional Certifications in Web Development</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><Briefcase /></div>
                  <div>
                    <div className="text-slate-900 font-bold">Career Focus</div>
                    <div className="text-slate-600 text-sm">Actively Seeking Frontend Internships</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg"><Users /></div>
                  <div>
                    <div className="text-slate-900 font-bold">Community</div>
                    <div className="text-slate-600 text-sm">Dedicated Community Volunteer & Peer Mentor</div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-900 bg-indigo-50 px-4 py-2 rounded-full">
                    <Briefcase className="text-indigo-600" /> Work on real-world projects
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-900 bg-indigo-50 px-4 py-2 rounded-full">
                    <Users className="text-indigo-600" /> Mentorship
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-900 bg-indigo-50 px-4 py-2 rounded-full">
                    <Check className="text-indigo-600" /> Teamwork
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <h4 className="text-xl font-bold text-slate-900">Technical Interests</h4>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600"><Monitor size={28} /></div>
                <div>
                  <h5 className="text-lg font-semibold text-slate-900">UI/UX Design</h5>
                  <p className="mt-2 text-sm text-slate-700">Crafting accessible, user-centered interfaces with attention to detail.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-50 text-green-600"><Zap size={28} /></div>
                <div>
                  <h5 className="text-lg font-semibold text-slate-900">Problem Solving</h5>
                  <p className="mt-2 text-sm text-slate-700">Applying algorithms and system thinking to build robust solutions.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600"><GitBranch size={28} /></div>
                <div>
                  <h5 className="text-lg font-semibold text-slate-900">Open Source</h5>
                  <p className="mt-2 text-sm text-slate-700">Collaborating on projects, code reviews, and community contributions.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600"><Code size={28} /></div>
                <div>
                  <h5 className="text-lg font-semibold text-slate-900">Frontend Development</h5>
                  <p className="mt-2 text-sm text-slate-700">Building high-performance, accessible, and user-centric web applications using modern frameworks.</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">React.js</span>
                    <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">JavaScript (ES6+)</span>
                    <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">HTML5</span>
                    <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">CSS3</span>
                    <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
