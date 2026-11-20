import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Target, 
  Zap, 
  Award, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function AboutSection({ stats }) {
  const statCards = [
    {
      title: "O‘quvchilar soni",
      value: stats?.students_count || "3,200+",
      desc: "Muvaffaqiyatli bitiruvchilar",
      icon: Users,
      gradient: "from-sky-500 to-blue-600",
      glowColor: "rgba(56, 189, 248, 0.25)"
    },
    {
      title: "Tajribali ustozlar",
      value: stats?.mentors_count || "25+",
      desc: "Top IT kompaniya mutaxassislari",
      icon: GraduationCap,
      gradient: "from-indigo-500 to-purple-600",
      glowColor: "rgba(99, 102, 241, 0.25)"
    },
    {
      title: "IT kurslari",
      value: stats?.courses_count || "12+",
      desc: "Talabgir zamonaviy yo'nalishlar",
      icon: BookOpen,
      gradient: "from-purple-500 to-pink-600",
      glowColor: "rgba(168, 85, 247, 0.25)"
    },
    {
      title: "Yaratilgan loyihalar",
      value: stats?.projects_count || "180+",
      desc: "Amaliy portfolio va startaplar",
      icon: Briefcase,
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.25)"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "100% Amaliy Ta'lim",
      desc: "Quruq nazariya o'rniga birinchi darsdanoq real bozor talabidagi amaliy loyihalar ustida ishlaysiz."
    },
    {
      icon: Target,
      title: "Shaxsiy Mentorlik",
      desc: "Har bir o'quvchiga yo'nalish bo'yicha kuchli senior mutaxassis biriktiriladi va kod tahlili o'tkaziladi."
    },
    {
      icon: TrendingUp,
      title: "Karyera Markazi",
      desc: "Rezyume tayyorlash, texnik suhbatlarga tayyorgarlik va yetakchi kompaniyalarda stajirovka imkoniyati."
    },
    {
      icon: Award,
      title: "Xalqaro Sertifikat",
      desc: "Kursni muvaffaqiyatli yakunlagan o'quvchilar QR-kodli xalqaro darajadagi IT LIVE sertifikatiga ega bo'ladilar."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#040712]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            Akademiya haqida
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Nega aynan <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">IT LIVE</span>?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            IT LIVE — bu shunchaki o'quv markazi emas, balki kelajak texnologiya mutaxassislarini tarbiyalaydigan va real bozor talablariga tayyorlaydigan innovatsion IT ekotizimdir.
          </p>
        </div>

        {/* Dynamic Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="relative rounded-2xl bg-slate-900/50 border border-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 group"
                style={{
                  boxShadow: `0 10px 30px -10px ${stat.glowColor}`
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.gradient} p-0.5 flex items-center justify-center shadow-lg`}>
                    <div className="w-full h-full bg-[#0a0f24] rounded-[10px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Jonli statistika
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-semibold text-slate-200 mb-1">
                  {stat.title}
                </p>
                <p className="text-xs text-slate-400 leading-normal">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Academy Mission & Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-slate-900/80 via-[#0a1128]/80 to-slate-900/80 rounded-3xl p-8 sm:p-12 border border-white/10 backdrop-blur-2xl">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              BIZNING MISSIYAMIZ
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Har bir talabaga IT sohasida muvaffaqiyatli karyera qurish imkoniyatini taqdim etish.
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Biz IT sohasidagi eng zamonaviy standartlar va vositalardan foydalangan holda dars beramiz. Siz nazariya bilan cheklanmaysiz, balki o'z qo'llaringiz bilan haqiqiy tizimlar yaratasiz.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-sky-400">
                <CheckCircle className="w-4 h-4 text-sky-400" /> Rasmiy litsenziyaga ega
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> IT Park rezidenti
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.title}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/30 transition-all hover:bg-white/[0.05]"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

