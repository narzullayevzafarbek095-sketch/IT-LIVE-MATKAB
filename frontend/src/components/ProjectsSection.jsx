import React from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Code2, 
  User, 
  Sparkles 
} from 'lucide-react';
import { Github } from './BrandIcons';

export default function ProjectsSection({ projects, onSelectProject }) {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#050814]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Amaliy Natijalar
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            O‘quvchilar <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Loyihalari</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            O'quvchilarimiz kurs davomida va diplom himoyasida yaratgan real ishlaydigan platformalar, sun'iy intellekt agentlari va avtomatlashtirish tizimlari.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="group relative rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.25)] flex flex-col overflow-hidden"
            >
              {/* Image with mock browser bar */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-800">
                <img
                  src={proj.image || "https://images.unsplash.com/photo-1557821552-17105176677c?w=800"}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                
                {/* Course tag badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-purple-500/80 text-white backdrop-blur-md shadow-md">
                    {proj.course_name}
                  </span>
                </div>

                {/* Author Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-semibold">
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <span>{proj.author_name}</span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Ishlatilgan texnologiyalar:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(proj.tech_stack) ? (
                      proj.tech_stack.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/5 border border-white/10 text-sky-300"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-sky-300 font-mono">{proj.tech_stack}</span>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-2 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Loyihani ko‘rish</span>
                  </button>

                  {proj.github_url && (
                    <a
                      href={proj.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors"
                      title="GitHub kodi"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
