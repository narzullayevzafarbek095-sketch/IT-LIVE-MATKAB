import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Menu, 
  X, 
  User, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  onOpenAuth, 
  onLogout, 
  onOpenStudentDashboard, 
  onOpenAdminDashboard,
  onNavigate 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Bosh sahifa', href: '#hero' },
    { label: 'Biz haqimizda', href: '#about' },
    { label: 'Kurslar', href: '#courses' },
    { label: 'Ustozlar', href: '#mentors' },
    { label: 'Loyihalar', href: '#projects' },
    { label: 'Aloqa', href: '#contact' },
  ];

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#050814]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[2px] transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
              <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-sky-400 group-hover:text-sky-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white font-mono">
                  IT <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">LIVE</span>
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 block -mt-1 font-semibold">
                Academy & Tech Lab
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-sky-400 hover:bg-white/5 rounded-full transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* User Auth Buttons / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <button
                    onClick={onOpenAdminDashboard}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(147,51,234,0.35)] transition-all transform hover:scale-105 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-200" />
                    <span>Admin Panel</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenStudentDashboard}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all transform hover:scale-105 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-sky-200" />
                    <span>Mening Kabinetim</span>
                  </button>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                  <img
                    src={currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.full_name}`}
                    alt={currentUser.full_name}
                    className="w-9 h-9 rounded-full ring-2 ring-sky-500/40 object-cover bg-slate-800"
                  />
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-semibold text-white leading-tight">
                      {currentUser.full_name}
                    </p>
                    <p className="text-[10px] text-slate-400 capitalize">
                      {currentUser.role === 'admin' ? 'Bosh Admin' : 'Talaba'}
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Chiqish"
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                >
                  Kirish
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="relative group px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_25px_rgba(56,189,248,0.6)]"></div>
                  <span className="relative flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-4 h-4 text-sky-200" />
                    Ro‘yxatdan o'tish
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser && (
              <button
                onClick={currentUser.role === 'admin' ? onOpenAdminDashboard : onOpenStudentDashboard}
                className="p-2 text-sky-400 bg-sky-500/10 rounded-lg border border-sky-500/30 text-xs font-bold"
              >
                {currentUser.role === 'admin' ? 'Admin' : 'Kabinet'}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-xl bg-slate-800/60 border border-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b19]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="flex items-center justify-between p-3 rounded-xl text-base font-medium text-slate-200 hover:text-sky-400 hover:bg-white/5 transition-all"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <img
                      src={currentUser.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser.full_name}`}
                      alt={currentUser.full_name}
                      className="w-10 h-10 rounded-full ring-2 ring-sky-500/40"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">{currentUser.full_name}</p>
                      <p className="text-xs text-slate-400">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  {currentUser.role === 'admin' ? (
                    <button
                      onClick={() => { setMobileMenuOpen(false); onOpenAdminDashboard(); }}
                      className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" /> Admin Panelga o'tish
                    </button>
                  ) : (
                    <button
                      onClick={() => { setMobileMenuOpen(false); onOpenStudentDashboard(); }}
                      className="w-full py-3 rounded-xl bg-sky-600 text-white font-semibold text-center flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" /> Mening Kabinetim
                    </button>
                  )}

                  <button
                    onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                    className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium text-center flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Tizimdan chiqish
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }}
                    className="w-full py-3 rounded-xl bg-slate-800 text-white font-semibold border border-white/10 text-center"
                  >
                    Tizimga kirish
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenAuth('register'); }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-center shadow-lg shadow-sky-500/20"
                  >
                    Ro'yxatdan o'tish
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

