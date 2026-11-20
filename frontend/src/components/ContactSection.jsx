import React, { useState } from 'react';
import { 
  Phone, 
  Send, 
  MapPin, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { Instagram } from './BrandIcons';
import { api } from '../api';

export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone_or_email: '',
    subject: 'Umumiy savol',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone_or_email.trim() || !formData.message.trim()) {
      onShowToast({ message: "Iltimos, barcha maydonlarni to'ldiring", type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitContact(formData);
      setSentSuccess(true);
      onShowToast({ message: res.message, type: 'success' });
      setFormData({
        name: '',
        phone_or_email: '',
        subject: 'Umumiy savol',
        message: ''
      });
    } catch (err) {
      onShowToast({ message: err.message || "Xatolik yuz berdi", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050814]">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Biz Bilan Bog'lanish
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Savollaringiz bormi? <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Aloqaga chiqing!</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Biz har doim yordam berishga tayyormiz. O'quv markazimizga tashrif buyuring yoki to'g'ridan-to'g'ri bog'laning.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Info cards (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex items-start gap-4 hover:border-sky-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Telefon raqamlarimiz</h4>
                <p className="text-xs text-slate-300 font-mono">+998 (71) 200-11-22</p>
                <p className="text-xs text-slate-300 font-mono">+998 (90) 123-45-67</p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> Dushanba - Shanba, 09:00 - 21:00
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex items-start gap-4 hover:border-indigo-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Telegram kanal va bot</h4>
                <a 
                  href="https://t.me/itlive_academy" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-sky-400 hover:underline font-mono block"
                >
                  @itlive_academy (Kanal)
                </a>
                <a 
                  href="https://t.me/itlive_support_bot" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-indigo-400 hover:underline font-mono block mt-0.5"
                >
                  @itlive_support_bot (Qo'llab-quvvatlash)
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex items-start gap-4 hover:border-pink-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Ijtimoiy tarmoqlar</h4>
                <a 
                  href="https://instagram.com/itlive.uz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-pink-400 hover:underline font-mono block"
                >
                  @itlive.uz (Instagram)
                </a>
                <p className="text-[11px] text-slate-400 mt-1">Darslar, masterklasslar va IT yangiliklar</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex items-start gap-4 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Manzilimiz</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Toshkent shahri, Chilonzor tumani, Bunyodkor shox ko'chasi, 42-uy. Mo'ljal: Mirzo Ulug'bek metrosi, IT Park innovatsiya markazi.
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form (Right 7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl">
              <h3 className="text-xl font-bold text-white mb-2">
                To'g'ridan-to'g'ri xabar yuborish
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Savollaringizni yozib qoldiring, mutaxassislarimiz qisqa vaqt ichida javob berishadi.
              </p>

              {sentSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Xabaringiz qabul qilindi!</h4>
                  <p className="text-xs text-slate-300">
                    Tez orada menejerlarimiz siz bilan bog'lanishadi.
                  </p>
                  <button
                    onClick={() => setSentSuccess(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-xs font-semibold text-white"
                  >
                    Yangi xabar yozish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Ismingiz *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ismingiz"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Telefon yoki Email *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+998 .. yoki email@.."
                        value={formData.phone_or_email}
                        onChange={(e) => setFormData({ ...formData, phone_or_email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mavzu
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-white/10 focus:border-sky-500 text-sm text-white outline-none"
                    >
                      <option value="Umumiy savol" className="bg-slate-900">Umumiy savol</option>
                      <option value="Kurslar va to'lov haqida" className="bg-slate-900">Kurslar va to'lov haqida</option>
                      <option value="Korporativ ta'lim" className="bg-slate-900">Korporativ ta'lim</option>
                      <option value="Hamkorlik va karyera" className="bg-slate-900">Hamkorlik va karyera</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Xabaringiz *
                    </label>
                    <textarea
                      required
                      rows="4"
                      placeholder="Savolingiz yoki taklifingizni bu yerga yozing..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? "Yuborilmoqda..." : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Xabarni Yuborish</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Google Maps Embed Container */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative h-80 sm:h-96 bg-slate-900">
          <iframe
            title="IT LIVE Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.073403323049!2d69.21557377663443!3d41.28551460232532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a38b1f5c6b9%3A0x6b7445778844837!2sIT%20Park%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(105%)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-950/90 border border-white/10 backdrop-blur-md flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-bold text-white">IT LIVE bosh binosi (Toshkent)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
