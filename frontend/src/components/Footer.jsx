import React from 'react';
import { 
  Code2, 
  Send, 
  Heart, 
  ArrowUp,
  Mail
} from 'lucide-react';
import { Instagram, Youtube, Github, Linkedin } from './BrandIcons';

export default function Footer({ onNavigate, courses }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03050d] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-sky-600/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5">
                <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-sky-400" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-mono">
                IT <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">LIVE</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              IT LIVE — zamonaviy IT kasblarini o‘rgatuvchi va o‘quvchilarni xalqaro darajadagi dasturchi hamda dizayner sifatida tayyorlovchi professional ta'lim akademiyasi.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://t.me/itlive_academy"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 hover:border-sky-500/50 flex items-center justify-center text-slate-400 hover:text-sky-400 transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/itlive.uz"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 hover:border-pink-500/50 flex items-center justify-center text-slate-400 hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 hover:border-red-500/50 flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 hover:border-white/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500/50 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigatsiya
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#hero" className="hover:text-sky-400 transition-colors">Bosh sahifa</a>
              </li>
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">Biz haqimizda</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors">Kurslar</a>
              </li>
              <li>
                <a href="#mentors" className="hover:text-sky-400 transition-colors">Ustozlar</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-sky-400 transition-colors">Loyihalar</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sky-400 transition-colors">Aloqa</a>
              </li>
            </ul>
          </div>

          {/* Core Courses List (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Mashhur Kurslar
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors">Frontend Development</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors">Backend Development</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors">Python Programming</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors">Artificial Intelligence</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors">UI/UX Design</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-sky-400 transition-colors">C++ Programming</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Working Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Aloqa va Ma'lumot
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-1.5 text-slate-300">
                <span>📍 Toshkent sh., Chilonzor, Bunyodkor 42</span>
              </p>
              <p className="font-mono text-sky-400">📞 +998 (71) 200-11-22</p>
              <p className="font-mono text-indigo-400">✉️ info@itlive.uz</p>
              <p className="text-[11px] text-slate-400 pt-1">
                Darslar haftasiga 3 kun (offline va online formatda)
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                ● Yangi guruhlarga qabul ochiq
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} IT LIVE Akademiya. Barcha huquqlar himoyalangan.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-sky-500/40 text-slate-400 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <span>Yuqoriga qaytish</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
