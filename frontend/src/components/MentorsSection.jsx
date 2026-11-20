import React from 'react';
import { 
  Send, 
  Star, 
  Award, 
  Users, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

export default function MentorsSection({ mentors }) {
  return (
    <section id="mentors" className="py-24 relative overflow-hidden bg-[#040712]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Top Mutaxassislar
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Tajribali <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Ustozlar</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Katta xalqaro va mahalliy loyihalarda toblangan, yetakchi kompaniyalarda faoliyat yurituvchi Senior mutaxassislardan ta'lim oling.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="group relative rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.25)] flex flex-col justify-between"
            >
              <div>
                {/* Mentor Avatar & Rating */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative shrink-0">
                    <img
                      src={mentor.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"}
                      alt={mentor.full_name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-500/40 group-hover:ring-sky-400 transition-all shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-md bg-yellow-500/20 border border-yellow-500/40 backdrop-blur-md flex items-center gap-1 text-[11px] font-bold text-yellow-300">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{mentor.rating || 4.9}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {mentor.full_name}
                    </h3>
                    <p className="text-xs font-semibold text-sky-400 mb-1.5">
                      {mentor.specialty}
                    </p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-slate-300">
                      <Award className="w-3 h-3 text-indigo-400" /> {mentor.experience}
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3">
                  {mentor.bio}
                </p>
              </div>

              {/* Bottom Specs & Social Links */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  <span>{mentor.students_count || 150}+ o‘quvchi</span>
                </div>

                {/* Social media icons */}
                <div className="flex items-center gap-2">
                  {mentor.telegram && (
                    <a
                      href={mentor.telegram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 transition-colors"
                      title="Telegram"
                    >
                      <Send className="w-4 h-4" />
                    </a>
                  )}
                  {mentor.github && (
                    <a
                      href={mentor.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {mentor.linkedin && (
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
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
