import React, { useState } from 'react';
import { 
  Clock, 
  BarChart, 
  Star, 
  ArrowUpRight, 
  Search, 
  UserCheck, 
  CheckCircle2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function CoursesSection({ 
  courses, 
  onSelectCourse, 
  onEnrollCourse 
}) {
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Barchasi', 'Dasturlash', 'Dizayn', "Sun'iy intellekt"];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'Barchasi' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses" className="py-24 relative overflow-hidden bg-[#050814]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Talabgir IT Yo‘nalishlari
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Professional <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">IT Kurslar</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Sohaning eng so'nggi talablari asosida tuzilgan o'quv dasturlari. Noldan boshlab yuqori daromadli mutaxassis bo'ling!
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Kurs qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/60 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-md transition-all"
            />
          </div>

        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group relative rounded-2xl bg-slate-900/60 border border-white/10 hover:border-sky-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.2)] flex flex-col overflow-hidden"
            >
              {/* Course Image & Badge */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-800">
                <img
                  src={course.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-sky-500/80 text-white backdrop-blur-md shadow-md">
                    {course.category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-yellow-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  <span>{course.rating || 4.9}</span>
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md text-indigo-300 font-mono text-xs font-bold">
                  {course.price}
                </div>
              </div>

              {/* Course Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Specs: Duration, Level & Mentor */}
                <div className="pt-2 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-400" /> Davomiyligi:
                    </span>
                    <span className="font-semibold text-slate-200">{course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <BarChart className="w-3.5 h-3.5 text-indigo-400" /> Darajasi:
                    </span>
                    <span className="font-semibold text-slate-200">{course.level}</span>
                  </div>

                  {course.mentor_name && (
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-purple-400" /> Ustoz:
                      </span>
                      <span className="font-semibold text-purple-300">{course.mentor_name}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-white/10 transition-all text-center cursor-pointer"
                  >
                    Batafsil ma'lumot
                  </button>

                  <button
                    onClick={() => onEnrollCourse(course)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Ro‘yxatdan o‘tish</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-white/5">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 text-base font-semibold">Hech qanday kurs topilmadi</p>
            <p className="text-slate-500 text-xs mt-1">Boshqa kalit so'z bilan qidirib ko'ring</p>
          </div>
        )}

      </div>
    </section>
  );
}

