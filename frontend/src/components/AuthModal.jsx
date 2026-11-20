import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  KeyRound
} from 'lucide-react';
import { api, setStoredToken, setStoredUser } from '../api';

export default function AuthModal({ 
  isOpen, 
  initialMode = 'login', 
  onClose, 
  onSuccess, 
  onShowToast 
}) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await api.login({
          email: formData.email,
          password: formData.password
        });
        setStoredToken(res.access_token);
        setStoredUser(res.user);
        onShowToast({ message: `Xush kelibsiz, ${res.user.full_name}!`, type: 'success' });
        onSuccess(res.user);
        onClose();
      } else {
        const res = await api.register({
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          phone: formData.phone
        });
        setStoredToken(res.access_token);
        setStoredUser(res.user);
        onShowToast({ message: "Ro'yxatdan muvaffaqiyatli o'tdingiz!", type: 'success' });
        onSuccess(res.user);
        onClose();
      }
    } catch (err) {
      onShowToast({ message: err.message || "Xatolik yuz berdi", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (role) => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@itlive.uz',
        password: 'admin123',
        full_name: '',
        phone: ''
      });
      setMode('login');
    } else {
      setFormData({
        email: 'student@itlive.uz',
        password: 'student123',
        full_name: '',
        phone: ''
      });
      setMode('login');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-[#090e23] border border-white/15 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[90px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[90px] rounded-full pointer-events-none"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="text-center mb-6">
          <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-white/10 mb-4">
            <button
              onClick={() => setMode('login')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => setMode('register')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          <h3 className="text-xl font-bold text-white">
            {mode === 'login' ? 'IT LIVE Tizimiga Kirish' : "Yangi O'quvchi Ro'yxatdan O'tishi"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' 
              ? 'Shaxsiy kabinetingizga kirish uchun ma\'lumotlaringizni kiriting' 
              : "Platformada o'qish va amaliyotni boshlash uchun hisob yarating"}
          </p>
        </div>

        {/* Demo Fast Fill Buttons */}
        <div className="mb-5 p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <p className="text-[11px] font-semibold text-slate-300 text-center flex items-center justify-center gap-1">
            <KeyRound className="w-3.5 h-3.5 text-sky-400" />
            Sinov uchun tayyor akkauntlar:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoAccount('admin')}
              className="py-1.5 px-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-[11px] font-bold text-center transition-colors cursor-pointer"
            >
              👑 Admin (Admin123)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount('student')}
              className="py-1.5 px-2 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-300 text-[11px] font-bold text-center transition-colors cursor-pointer"
            >
              🎓 O'quvchi (Student123)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ism va familiyangiz *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Jasur Alimov"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Telefon raqami
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email manzilingiz *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="example@itlive.uz"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Parol *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Tekshirilmoqda...
              </span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Tizimga Kirish' : "Ro'yxatdan O'tish"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

