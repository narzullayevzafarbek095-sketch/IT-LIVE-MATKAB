import React from 'react';
import { 
  X, 
  ExternalLink, 
  User, 
  BookOpen, 
  CheckCircle,
  Code2
} from 'lucide-react';
import { Github } from './BrandIcons';

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#090e24] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-950">
          <img
            src={project.image || "https://images.unsplash.com/photo-1557821552-17105176677c?w=800"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090e24] via-[#090e24]/40 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-purple-500 text-white shadow-md">
              {project.course_name}
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 text-xs text-slate-400 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <User className="w-4 h-4 text-sky-400" />
              <span>Muallif: {project.author_name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-white font-medium">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Kurs: {project.course_name}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Loyiha haqida
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Texnologiyalar to'plami (Tech Stack)
            </h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.tech_stack) ? (
                project.tech_stack.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800 border border-white/10 text-sky-300"
                  >
                    {t}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-sky-300">
                  {project.tech_stack}
                </span>
              )}
            </div>
          </div>

          {/* Action links */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs text-center shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Jonli Loyihani Ko'rish (Demo)</span>
              </a>
            )}

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Manbasi</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
