import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Award, 
  Clock, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Download, 
  ExternalLink,
  Percent,
  QrCode
} from 'lucide-react';
import { api } from '../api';

export default function StudentDashboardModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onShowToast 
}) {
  const [activeTab, setActiveTab] = useState('courses'); // 'profile', 'courses', 'schedule', 'grades', 'assignments', 'certificates'
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Homework submission state
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Certificate modal preview
  const [previewCert, setPreviewCert] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadDashboard();
    }
  }, [isOpen]);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const data = await api.getStudentDashboard();
      setDashboardData(data);
    } catch (err) {
      onShowToast({ message: err.message || "Kabinet ma'lumotlarini yuklashda xatolik", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.submitAssignment({
        assignment_id: selectedAssignment.id,
        submission_text: submissionText
      });
      onShowToast({ message: res.message, type: 'success' });
      setSelectedAssignment(null);
      setSubmissionText('');
      loadDashboard();
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'courses', label: 'Tanlangan kurslar', icon: BookOpen },
    { id: 'schedule', label: 'Darslar jadvali', icon: Calendar },
    { id: 'assignments', label: 'Topshiriqlar', icon: FileText },
    { id: 'grades', label: "O'zlashtirish", icon: TrendingUp },
    { id: 'certificates', label: 'Sertifikatlar', icon: Award },
    { id: 'profile', label: 'Shaxsiy profil', icon: User }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl rounded-3xl bg-[#080d22] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden my-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0c132f] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5">
              <img
                src={currentUser?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser?.full_name}`}
                alt="Avatar"
                className="w-full h-full rounded-[10px] object-cover bg-slate-900"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {currentUser?.full_name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Talaba Kabineti
                </span>
              </div>
              <p className="text-xs text-slate-400">{currentUser?.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-slate-950/70 border-b border-white/10 overflow-x-auto shrink-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-slate-400">Ma'lumotlar yuklanmoqda...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: TANLANGAN KURSLAR */}
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      Siz tahsil olayotgan kurslar ({dashboardData?.enrolled_courses?.length || 0})
                    </h4>
                  </div>

                  {dashboardData?.enrolled_courses?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dashboardData.enrolled_courses.map((c) => (
                        <div
                          key={c.course_id}
                          className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-sky-500/40 transition-all space-y-4"
                        >
                          <div className="flex items-start gap-4">
                            <img
                              src={c.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"}
                              alt={c.title}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md">
                                {c.category}
                              </span>
                              <h5 className="text-base font-bold text-white mt-1">
                                {c.title}
                              </h5>
                              <p className="text-xs text-slate-400">Ustoz: {c.mentor_name}</p>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-400">O'zlashtirish jarayoni:</span>
                              <span className="font-mono font-bold text-sky-400">{c.progress}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                                style={{ width: `${c.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
                            <span>Davomiyligi: {c.duration}</span>
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {c.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-slate-400 text-sm">Hozircha faol kurslaringiz yo'q</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: DARSLAR JADVALI */}
              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    Haftalik Darslar Jadvali
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardData?.schedules?.map((s) => (
                      <div
                        key={s.id}
                        className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold">
                            {s.day_of_week}
                          </span>
                          <span className="text-xs font-mono text-sky-400 font-bold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {s.time_slot}
                          </span>
                        </div>

                        <div>
                          <h5 className="text-base font-bold text-white">{s.title}</h5>
                          <p className="text-xs text-slate-400 mt-0.5">Kurs: {s.course_title}</p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-300">
                          <span>Mentor: <strong className="text-white">{s.mentor_name}</strong></span>
                          <span className="text-indigo-400 font-mono">{s.room_or_link}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TOPSHIRIQLAR & VAZIFALAR */}
              {activeTab === 'assignments' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Uyga vazifalar va Amaliy topshiriqlar
                  </h4>

                  <div className="space-y-3">
                    {dashboardData?.assignments?.map((a) => (
                      <div
                        key={a.id}
                        className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-bold text-white">{a.title}</h5>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              a.status === 'Tekshirildi'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : a.status === 'Topshirildi'
                                ? 'bg-sky-500/20 text-sky-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {a.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{a.description}</p>
                          <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                            <span>Muddati: <strong className="text-slate-300">{a.deadline}</strong></span>
                            {a.score !== null && (
                              <span className="text-emerald-400 font-bold">Baho: {a.score}/{a.max_score}</span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedAssignment(a);
                            setSubmissionText(a.submission_text || '');
                          }}
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                        >
                          {a.status === 'Tekshirildi' ? "Javobni ko'rish" : "Vazifani topshirish"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: O'ZLASHTIRISH KO'RSATKICHLARI */}
              {activeTab === 'grades' && (
                <div className="space-y-6">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    O‘zlashtirish va Akademik Natijalar
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <p className="text-xs text-slate-400">O'rtacha ball</p>
                      <p className="text-3xl font-black text-emerald-400 font-mono mt-1">
                        {dashboardData?.metrics?.average_score || 95}%
                      </p>
                      <p className="text-[10px] text-emerald-300 mt-1">A'lo daraja</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <p className="text-xs text-slate-400">Davomat</p>
                      <p className="text-3xl font-black text-sky-400 font-mono mt-1">
                        {dashboardData?.metrics?.attendance_rate || "98%"}
                      </p>
                      <p className="text-[10px] text-sky-300 mt-1">Dars qoldirilmagan</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <p className="text-xs text-slate-400">Topshirilgan vazifalar</p>
                      <p className="text-3xl font-black text-indigo-400 font-mono mt-1">
                        {dashboardData?.metrics?.completed_assignments || 2}
                      </p>
                      <p className="text-[10px] text-indigo-300 mt-1">Barcha modullar bo'yicha</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <p className="text-xs text-slate-400">Sertifikatlar</p>
                      <p className="text-3xl font-black text-purple-400 font-mono mt-1">
                        {dashboardData?.certificates?.length || 1}
                      </p>
                      <p className="text-[10px] text-purple-300 mt-1">Tasdiqlangan QR-kodli</p>
                    </div>
                  </div>

                  {/* Skills radar / indicators */}
                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                    <h5 className="text-sm font-bold text-white">Texnik ko'nikmalar darajasi:</h5>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>HTML5, Modern CSS3 & Tailwind CSS</span>
                          <span className="font-mono text-sky-400">92%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-sky-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>JavaScript (ES6+) & DOM Manipulation</span>
                          <span className="font-mono text-indigo-400">88%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>React.js SPA, State & Components</span>
                          <span className="font-mono text-purple-400">85%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SERTIFIKATLAR */}
              {activeTab === 'certificates' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-400" />
                    Rasmiy Xalqaro Sertifikatlar
                  </h4>

                  {dashboardData?.certificates?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dashboardData.certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#101b3b] border border-yellow-500/30 hover:border-yellow-500/60 transition-all space-y-4 shadow-xl"
                        >
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-md bg-yellow-500/20 text-yellow-300 text-xs font-mono font-bold">
                              {cert.certificate_code}
                            </span>
                            <span className="text-xs font-bold text-emerald-400">{cert.grade}</span>
                          </div>

                          <div>
                            <h5 className="text-lg font-bold text-white">{cert.course_name}</h5>
                            <p className="text-xs text-slate-400 mt-1">Berilgan sana: {cert.issue_date}</p>
                            <p className="text-xs text-slate-300 mt-0.5">Talaba: <strong>{cert.student_name}</strong></p>
                          </div>

                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <button
                              onClick={() => setPreviewCert(cert)}
                              className="px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Award className="w-4 h-4" />
                              <span>Sertifikatni ochish</span>
                            </button>

                            <button
                              onClick={() => window.print()}
                              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                              title="Chop etish / Yuklab olish"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-slate-400 text-sm">Kursni to'liq tamomlaganingizdan so'ng sertifikat bu yerda paydo bo'ladi.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: SHAXSIY PROFIL */}
              {activeTab === 'profile' && (
                <div className="space-y-6 max-w-xl">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-sky-400" />
                    Shaxsiy Ma'lumotlar
                  </h4>

                  <div className="space-y-4 p-6 rounded-2xl bg-slate-900/60 border border-white/10">
                    <div className="flex items-center gap-4">
                      <img
                        src={currentUser?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${currentUser?.full_name}`}
                        alt="Profile"
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sky-500/50"
                      />
                      <div>
                        <h5 className="text-lg font-bold text-white">{currentUser?.full_name}</h5>
                        <p className="text-xs text-sky-400 font-mono">Talaba ID: #{currentUser?.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                      <div>
                        <p className="text-slate-400">Email:</p>
                        <p className="font-semibold text-white mt-0.5">{currentUser?.email}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Telefon:</p>
                        <p className="font-semibold text-white mt-0.5">{currentUser?.phone || '+998 90 123 45 67'}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-slate-400">Qisqacha ma'lumot (Bio):</p>
                        <p className="text-slate-300 mt-0.5 leading-relaxed">
                          {currentUser?.bio || "IT LIVE akademiyasining iqtidorli talabasi."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal for Homework Submission */}
        {selectedAssignment && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-2xl bg-[#0b122e] border border-white/20 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Vazifani topshirish</h4>
                <button 
                  onClick={() => setSelectedAssignment(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="text-xs font-semibold text-sky-400">{selectedAssignment.title}</p>
                <p className="text-xs text-slate-400 mt-1">{selectedAssignment.description}</p>
              </div>

              <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    GitHub havolasi yoki javob matni *
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="https://github.com/username/project yoki bajarilgan ish hisoboti..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-sm text-white placeholder-slate-500 outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAssignment(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                  >
                    {submitting ? 'Yuborilmoqda...' : 'Topshirish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Certificate Fullscreen Printable Viewer */}
        {previewCert && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-tr from-[#0a102b] via-[#0f172a] to-[#0a102b] border-4 border-yellow-500/60 p-8 sm:p-12 shadow-[0_0_80px_rgba(234,179,8,0.25)] text-center space-y-6">
              <button 
                onClick={() => setPreviewCert(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
                  <Award className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-white font-mono">IT LIVE ACADEMY</h3>
                  <p className="text-[10px] uppercase tracking-widest text-yellow-400 font-bold">Xalqaro Professional Sertifikat</p>
                </div>
              </div>

              <div className="space-y-2 py-4 border-y border-white/10">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Ushbu sertifikat tasdiqlaydiki,</p>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-wide py-2">
                  {previewCert.student_name}
                </h2>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  IT LIVE akademiyasining <strong>"{previewCert.course_name}"</strong> professional o'quv kursini muvaffaqiyatli tamomladi va amaliy imtihonlarni <strong>{previewCert.grade}</strong> natija bilan himoya qildi.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-4">
                <div className="text-left font-mono">
                  <p className="text-slate-500">Sertifikat kodi:</p>
                  <p className="font-bold text-yellow-400">{previewCert.certificate_code}</p>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                  <QrCode className="w-8 h-8 text-white" />
                  <div className="text-[10px] text-left">
                    <p className="text-emerald-400 font-bold">VERIFIED</p>
                    <p className="text-slate-400">itlive.uz/verify</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-slate-500">Berilgan sana:</p>
                  <p className="font-semibold text-white">{previewCert.issue_date}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

