import React from 'react';
import { 
  X, 
  Clock, 
  BarChart, 
  Star, 
  CheckCircle, 
  BookOpen, 
  Calendar, 
  User, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CourseDetailModal({ 
  course, 
  isOpen, 
  onClose, 
  onEnroll 
}) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#090e24] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero banner of modal */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img
            src={course.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090e24] via-[#090e24]/70 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500 text-white shadow-md">
                {course.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/15 backdrop-blur-md">
                {course.level}
              </span>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 text-yellow-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-yellow-400" />
                <span>{course.rating || 4.9}</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Davomiyligi</p>
              <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-sky-400" /> {course.duration}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Darslar jadvali</p>
              <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-indigo-400" /> Haftada 3 kun
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Bosh ustoz</p>
              <p className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <User className="w-4 h-4 text-purple-400" /> {course.mentor_name || 'Senior Mentor'}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 uppercase font-semibold">Narxi</p>
              <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                {course.price}
              </p>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" /> Kurs haqida to'liq ma'lumot
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {course.full_description || course.description}
            </p>
          </div>

          {/* Syllabus / Modules */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> O'quv dasturi (Syllabus)
              </h4>
              <div className="space-y-2.5">
                {course.syllabus.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-sky-500/30 transition-all flex items-start gap-3"
                  >
                    <div className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-mono font-bold shrink-0">
                      {item.module || `${idx + 1}-Modul`}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-bold text-white">{item.title}</p>
                      {item.duration && (
                        <p className="text-[11px] text-slate-400 mt-0.5">Davomiyligi: {item.duration}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA in Modal */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">Yangi guruhga qabul ochiq!</p>
              <p className="text-xs font-semibold text-emerald-400">Birinchi darsga bepul qatnashing</p>
            </div>
            
            <button
              onClick={() => {
                onClose();
                onEnroll(course);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ushbu kursga ro‘yxatdan o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

