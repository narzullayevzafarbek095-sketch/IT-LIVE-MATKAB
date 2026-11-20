import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  User, 
  Calendar, 
  BookOpen, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { api } from '../api';

export default function RegistrationSection({ 
  courses, 
  preSelectedCourse, 
  onShowToast 
}) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    age: '',
    course_title: '',
    course_id: null,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (preSelectedCourse) {
      setFormData(prev => ({
        ...prev,
        course_title: preSelectedCourse.title,
        course_id: preSelectedCourse.id
      }));
    } else if (courses.length > 0 && !formData.course_title) {
      setFormData(prev => ({
        ...prev,
        course_title: courses[0].title,
        course_id: courses[0].id
      }));
    }
  }, [preSelectedCourse, courses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'course_title') {
      const selected = courses.find(c => c.title === value);
      setFormData(prev => ({
        ...prev,
        course_title: value,
        course_id: selected ? selected.id : null
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name.trim() || !formData.phone.trim() || !formData.course_title) {
      onShowToast({ message: "Iltimos, barcha majburiy maydonlarni to'ldiring!", type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        full_name: formData.full_name,
        phone: formData.phone,
        age: formData.age ? parseInt(formData.age, 10) : null,
        course_id: formData.course_id,
        course_title: formData.course_title,
        comment: formData.comment
      };
      const res = await api.submitRegistration(payload);
      setSubmittedSuccess(true);
      onShowToast({ message: res.message, type: 'success' });
      setFormData({
        full_name: '',
        phone: '',
        age: '',
        course_title: courses[0]?.title || '',
        course_id: courses[0]?.id || null,
        comment: ''
      });
    } catch (err) {
      onShowToast({ message: err.message || "Xatolik yuz berdi. Qayta urinib ko'ring.", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="py-24 relative overflow-hidden bg-[#040712]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-sky-600/15 via-indigo-600/15 to-purple-600/15 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Info & Incentives */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Ro'yxatdan O'tish
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                IT karerangizni <br />
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  bugunoq boshlang!
                </span>
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Kursga ro'yxatdan o'ting va bizning ekspertlarimiz 15 daqiqa ichida siz bilan bog'lanib, bepul sinov darsi hamda individual o'quv rejasini taqdim etishadi.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Bepul konsultatsiya va darajani aniqlash</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Birinchi kirish darsi mutlaqo bepul</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Muddatli to'lov imkoniyati (0% ustama bilan)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-sky-400 shrink-0" />
                <p className="text-xs text-slate-400">
                  Ma'lumotlaringiz xavfsiz himoyalangan va faqat o'quv jarayonini tashkillashtirish uchun ishlatiladi.
                </p>
              </div>
            </div>

            {/* Right Column: Working Form */}
            <div className="lg:col-span-7">
              {submittedSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Arizangiz muvaffaqiyatli qabul qilindi!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    IT LIVE akademiyasi ma'muri tez orada siz bilan telefon orqali bog'lanadi va barcha savollaringizga batafsil javob beradi.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Yana ariza yuborish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sky-400" />
                      Ism va familiyangiz *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      placeholder="Masalan: Jasur Alimov"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number & Age (2 columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-indigo-400" />
                        Telefon raqamingiz *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+998 90 123 45 67"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        Yoshingiz
                      </label>
                      <input
                        type="number"
                        name="age"
                        min="10"
                        max="70"
                        placeholder="Masalan: 20"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                      Tanlangan kurs *
                    </label>
                    <select
                      name="course_title"
                      required
                      value={formData.course_title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 focus:border-sky-500 text-sm text-white outline-none transition-all"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.title} className="bg-slate-900 text-white">
                          {c.title} ({c.duration} - {c.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      Qo'shimcha izoh yoki savollaringiz
                    </label>
                    <textarea
                      name="comment"
                      rows="3"
                      placeholder="Dars vaqti, kompyuter savodxonligi yoki qiziqishlaringiz haqida yozishingiz mumkin..."
                      value={formData.comment}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Yuborilmoqda...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Arizani Yuborish</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

