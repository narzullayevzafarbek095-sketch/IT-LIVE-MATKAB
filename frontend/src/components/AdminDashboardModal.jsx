import React, { useState, useEffect } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  FolderGit2, 
  ClipboardList, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Save,
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { api } from '../api';

export default function AdminDashboardModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onShowToast,
  onRefreshData
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'registrations', 'courses', 'mentors', 'projects', 'students', 'messages'
  const [dashboardData, setDashboardData] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats edit form
  const [statsForm, setStatsForm] = useState({
    students_count: '',
    mentors_count: '',
    courses_count: '',
    projects_count: '',
    employment_rate: ''
  });

  // Course Modal state (Create / Edit)
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    description: '',
    full_description: '',
    duration: '',
    level: "Boshlang'ich",
    category: 'Dasturlash',
    price: "1,200,000 so'm / oy",
    image: '',
    rating: 4.9,
    mentor_name: ''
  });

  // Mentor Modal state
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);
  const [mentorForm, setMentorForm] = useState({
    full_name: '',
    specialty: '',
    experience: '5+ yil tajriba',
    bio: '',
    avatar: '',
    telegram: '',
    github: '',
    linkedin: '',
    rating: 4.9,
    students_count: 150
  });

  // Project Modal state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    author_name: '',
    course_name: 'Frontend Development',
    image: '',
    demo_url: '',
    github_url: '',
    tech_stack: 'React, Tailwind'
  });

  useEffect(() => {
    if (isOpen) {
      loadAllAdminData();
    }
  }, [isOpen]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [dash, regs, crs, mnt, prj, usr, msg] = await Promise.all([
        api.getAdminDashboard(),
        api.getRegistrations(),
        api.getCourses(),
        api.getMentors(),
        api.getProjects(),
        api.getUsers(),
        api.getMessages()
      ]);

      setDashboardData(dash);
      setStatsForm({
        students_count: dash?.academy_stats?.students_count || '3,200+',
        mentors_count: dash?.academy_stats?.mentors_count || '25+',
        courses_count: dash?.academy_stats?.courses_count || '12+',
        projects_count: dash?.academy_stats?.projects_count || '180+',
        employment_rate: dash?.academy_stats?.employment_rate || '96%'
      });
      setRegistrations(regs);
      setCoursesList(crs);
      setMentorsList(mnt);
      setProjectsList(prj);
      setUsersList(usr);
      setMessagesList(msg);
    } catch (err) {
      onShowToast({ message: err.message || "Ma'lumotlarni yuklashda xatolik", type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Update Stats
  const handleSaveStats = async (e) => {
    e.preventDefault();
    try {
      await api.updateStats(statsForm);
      onShowToast({ message: "Akademiya statistikasi muvaffaqiyatli saqlandi!", type: 'success' });
      onRefreshData();
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  // Registration Status update
  const handleRegStatusChange = async (id, status) => {
    try {
      await api.updateRegistrationStatus(id, status);
      setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      onShowToast({ message: "Ariza holati yangilandi", type: 'success' });
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  const handleDeleteReg = async (id) => {
    if (!window.confirm("Arizani o'chirishga ishonchingiz komilmi?")) return;
    try {
      await api.deleteRegistration(id);
      setRegistrations(prev => prev.filter(r => r.id !== id));
      onShowToast({ message: "Ariza o'chirildi", type: 'success' });
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  // Course actions
  const handleOpenCourseModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setCourseForm({
        title: course.title,
        slug: course.slug || course.title.toLowerCase().replace(/\s+/g, '-'),
        description: course.description,
        full_description: course.full_description || '',
        duration: course.duration,
        level: course.level,
        category: course.category,
        price: course.price,
        image: course.image || '',
        rating: course.rating || 4.9,
        mentor_name: course.mentor_name || ''
      });
    } else {
      setEditingCourse(null);
      setCourseForm({
        title: '',
        slug: '',
        description: '',
        full_description: '',
        duration: '6 oy',
        level: "Boshlang'ich",
        category: 'Dasturlash',
        price: "1,200,000 so'm / oy",
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        rating: 4.9,
        mentor_name: 'IT LIVE Mentor'
      });
    }
    setCourseModalOpen(true);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await api.updateCourse(editingCourse.id, courseForm);
        onShowToast({ message: "Kurs muvaffaqiyatli yangilandi", type: 'success' });
      } else {
        const slug = courseForm.slug || courseForm.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        await api.createCourse({ ...courseForm, slug });
        onShowToast({ message: "Yangi kurs muvaffaqiyatli qo'shildi", type: 'success' });
      }
      setCourseModalOpen(false);
      loadAllAdminData();
      onRefreshData();
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Kursni o'chirishga ishonchingiz komilmi?")) return;
    try {
      await api.deleteCourse(id);
      setCoursesList(prev => prev.filter(c => c.id !== id));
      onShowToast({ message: "Kurs o'chirildi", type: 'success' });
      onRefreshData();
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  // Mentor actions
  const handleOpenMentorModal = (mentor = null) => {
    if (mentor) {
      setEditingMentor(mentor);
      setMentorForm({
        full_name: mentor.full_name,
        specialty: mentor.specialty,
        experience: mentor.experience,
        bio: mentor.bio || '',
        avatar: mentor.avatar || '',
        telegram: mentor.telegram || '',
        github: mentor.github || '',
        linkedin: mentor.linkedin || '',
        rating: mentor.rating || 4.9,
        students_count: mentor.students_count || 150
      });
    } else {
      setEditingMentor(null);
      setMentorForm({
        full_name: '',
        specialty: '',
        experience: '5+ yil tajriba',
        bio: '',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        telegram: 'https://t.me/itlive_academy',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        rating: 4.9,
        students_count: 100
      });
    }
    setMentorModalOpen(true);
  };

  const handleSaveMentor = async (e) => {
    e.preventDefault();
    try {
      if (editingMentor) {
        await api.updateMentor(editingMentor.id, mentorForm);
        onShowToast({ message: "Ustoz ma'lumotlari yangilandi", type: 'success' });
      } else {
        await api.createMentor(mentorForm);
        onShowToast({ message: "Yangi ustoz qo'shildi", type: 'success' });
      }
      setMentorModalOpen(false);
      loadAllAdminData();
      onRefreshData();
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  const handleDeleteMentor = async (id) => {
    if (!window.confirm("Ustozni o'chirishga ishonchingiz komilmi?")) return;
    try {
      await api.deleteMentor(id);
      setMentorsList(prev => prev.filter(m => m.id !== id));
      onShowToast({ message: "Ustoz o'chirildi", type: 'success' });
      onRefreshData();
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  // Project actions
  const handleOpenProjectModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        description: proj.description,
        author_name: proj.author_name,
        course_name: proj.course_name,
        image: proj.image || '',
        demo_url: proj.demo_url || '',
        github_url: proj.github_url || '',
        tech_stack: Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : proj.tech_stack
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        author_name: '',
        course_name: 'Frontend Development',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        demo_url: 'https://example.com',
        github_url: 'https://github.com',
        tech_stack: 'React, Tailwind CSS, JavaScript'
      });
    }
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, projectForm);
        onShowToast({ message: "Loyiha yangilandi", type: 'success' });
      } else {
        await api.createProject(projectForm);
        onShowToast({ message: "Yangi loyiha qo'shildi", type: 'success' });
      }
      setProjectModalOpen(false);
      loadAllAdminData();
      onRefreshData();
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Loyihani o'chirishga ishonchingiz komilmi?")) return;
    try {
      await api.deleteProject(id);
      setProjectsList(prev => prev.filter(p => p.id !== id));
      onShowToast({ message: "Loyiha o'chirildi", type: 'success' });
      onRefreshData();
    } catch (err) {
      onShowToast({ message: err.message, type: 'error' });
    }
  };

  if (!isOpen) return null;

  const adminTabs = [
    { id: 'overview', label: 'Umumiy hisobot', icon: LayoutDashboard },
    { id: 'registrations', label: `Arizalar (${registrations.length})`, icon: ClipboardList },
    { id: 'courses', label: `Kurslar (${coursesList.length})`, icon: BookOpen },
    { id: 'mentors', label: `Ustozlar (${mentorsList.length})`, icon: GraduationCap },
    { id: 'projects', label: `Loyihalar (${projectsList.length})`, icon: FolderGit2 },
    { id: 'students', label: `O'quvchilar (${usersList.length})`, icon: Users },
    { id: 'messages', label: `Xabarlar (${messagesList.length})`, icon: MessageSquare }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-6xl rounded-3xl bg-[#080d22] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-purple-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0c122e] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">IT LIVE Boshqaruv Markazi</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">Akademiya o'quv tizimi va statistikasini to'liq boshqarish</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Tabs */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-slate-950/70 border-b border-white/10 overflow-x-auto shrink-0 scrollbar-none">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Container */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-slate-400">Admin ma'lumotlari yuklanmoqda...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW & LIVE STATS EDITOR */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Top Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                      <p className="text-xs text-slate-400">Jami Arizalar</p>
                      <p className="text-3xl font-black text-white font-mono mt-1">
                        {dashboardData?.metrics?.registrations_count || 0}
                      </p>
                      <span className="text-[11px] text-amber-400 font-semibold mt-1 block">
                        Yangi: {dashboardData?.metrics?.new_registrations || 0} ta
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                      <p className="text-xs text-slate-400">Ro'yxatdagi O'quvchilar</p>
                      <p className="text-3xl font-black text-sky-400 font-mono mt-1">
                        {dashboardData?.metrics?.students_count || 0}
                      </p>
                      <span className="text-[11px] text-sky-300 font-semibold mt-1 block">
                        Faol talabalar
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                      <p className="text-xs text-slate-400">Faol IT Kurslar</p>
                      <p className="text-3xl font-black text-indigo-400 font-mono mt-1">
                        {dashboardData?.metrics?.courses_count || 0}
                      </p>
                      <span className="text-[11px] text-indigo-300 font-semibold mt-1 block">
                        Amaldagi yo'nalishlar
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                      <p className="text-xs text-slate-400">Tajribali Ustozlar</p>
                      <p className="text-3xl font-black text-purple-400 font-mono mt-1">
                        {dashboardData?.metrics?.mentors_count || 0}
                      </p>
                      <span className="text-[11px] text-purple-300 font-semibold mt-1 block">
                        Senior mentorlar
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Stats Editor Section (User requirement: stats can be changed by admin) */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-[#121936] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-sky-400" />
                          Bosh Sahifa Jonli Statistikasini O'zgartirish
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Ushbu qiymatlar saytning "Biz haqimizda" bo'limida avtomatik yangilanadi.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveStats} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          O'quvchilar soni
                        </label>
                        <input
                          type="text"
                          value={statsForm.students_count}
                          onChange={(e) => setStatsForm({ ...statsForm, students_count: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Tajribali ustozlar
                        </label>
                        <input
                          type="text"
                          value={statsForm.mentors_count}
                          onChange={(e) => setStatsForm({ ...statsForm, mentors_count: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          IT kurslari
                        </label>
                        <input
                          type="text"
                          value={statsForm.courses_count}
                          onChange={(e) => setStatsForm({ ...statsForm, courses_count: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-xs text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Yaratilgan loyihalar
                        </label>
                        <input
                          type="text"
                          value={statsForm.projects_count}
                          onChange={(e) => setStatsForm({ ...statsForm, projects_count: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 focus:border-sky-500 text-xs text-white outline-none"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Saqlash</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 2: ARIZALAR (REGISTRATIONS) */}
              {activeTab === 'registrations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-sky-400" />
                      Ro'yxatdan o'tganlar va Kurs arizalari ({registrations.length})
                    </h4>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-white/10">
                        <tr>
                          <th className="px-4 py-3">#</th>
                          <th className="px-4 py-3">Ism va familiya</th>
                          <th className="px-4 py-3">Telefon raqami</th>
                          <th className="px-4 py-3">Yosh</th>
                          <th className="px-4 py-3">Tanlangan kurs</th>
                          <th className="px-4 py-3">Izoh</th>
                          <th className="px-4 py-3">Holati</th>
                          <th className="px-4 py-3 text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {registrations.map((reg) => (
                          <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-mono text-slate-400">#{reg.id}</td>
                            <td className="px-4 py-3 font-semibold text-white">{reg.full_name}</td>
                            <td className="px-4 py-3 font-mono text-sky-400">{reg.phone}</td>
                            <td className="px-4 py-3">{reg.age || '—'}</td>
                            <td className="px-4 py-3 font-medium text-purple-300">{reg.course_title}</td>
                            <td className="px-4 py-3 max-w-xs truncate text-slate-400" title={reg.comment}>
                              {reg.comment || '—'}
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={reg.status}
                                onChange={(e) => handleRegStatusChange(reg.id, e.target.value)}
                                className={`px-2 py-1 rounded-lg text-xs font-semibold outline-none border cursor-pointer ${
                                  reg.status === 'Yangi'
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : reg.status === "Bog'lanildi"
                                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                    : reg.status === 'Qabul qilindi'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-red-500/20 text-red-300 border-red-500/40'
                                }`}
                              >
                                <option value="Yangi" className="bg-slate-900">Yangi</option>
                                <option value="Bog'lanildi" className="bg-slate-900">Bog'lanildi</option>
                                <option value="Qabul qilindi" className="bg-slate-900">Qabul qilindi</option>
                                <option value="Bekor qilindi" className="bg-slate-900">Bekor qilindi</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => handleDeleteReg(reg.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                                title="O'chirish"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: KURSLAR BOSHQARUVI */}
              {activeTab === 'courses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-400" />
                      IT Kurslar Ro'yxati ({coursesList.length})
                    </h4>
                    <button
                      onClick={() => handleOpenCourseModal()}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Yangi Kurs Qo'shish</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coursesList.map((course) => (
                      <div
                        key={course.id}
                        className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full">
                              {course.category}
                            </span>
                            <span className="text-xs font-mono text-emerald-400 font-bold">{course.price}</span>
                          </div>

                          <h5 className="text-base font-bold text-white">{course.title}</h5>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>

                          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                            <span>Davomiyligi: {course.duration}</span>
                            <span>Ustoz: {course.mentor_name}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenCourseModal(course)}
                            className="p-2 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Tahrirlash</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>O'chirish</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: USTOZLAR BOSHQARUVI */}
              {activeTab === 'mentors' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                      Ustozlar Boshqaruvi ({mentorsList.length})
                    </h4>
                    <button
                      onClick={() => handleOpenMentorModal()}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Yangi Ustoz Qo'shish</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mentorsList.map((mentor) => (
                      <div
                        key={mentor.id}
                        className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={mentor.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"}
                            alt={mentor.full_name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <h5 className="text-sm font-bold text-white">{mentor.full_name}</h5>
                            <p className="text-xs text-sky-400 font-semibold">{mentor.specialty}</p>
                            <p className="text-[11px] text-slate-400">{mentor.experience}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenMentorModal(mentor)}
                            className="p-2 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Tahrirlash</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMentor(mentor.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>O'chirish</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: LOYIHALAR BOSHQARUVI */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-purple-400" />
                      O'quvchilar Loyihalari Portfoliosi ({projectsList.length})
                    </h4>
                    <button
                      onClick={() => handleOpenProjectModal()}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Yangi Loyiha Qo'shish</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectsList.map((p) => (
                      <div
                        key={p.id}
                        className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-md">
                              {p.course_name}
                            </span>
                            <span className="text-xs text-slate-400">Muallif: {p.author_name}</span>
                          </div>
                          <h5 className="text-base font-bold text-white">{p.title}</h5>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                            {p.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenProjectModal(p)}
                            className="p-2 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Tahrirlash</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>O'chirish</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: RO'YXATDAGI O'QUVCHILAR */}
              {activeTab === 'students' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-sky-400" />
                    Ro'yxatdan o'tgan foydalanuvchilar va Talabalar ({usersList.length})
                  </h4>

                  <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-white/10">
                        <tr>
                          <th className="px-4 py-3">ID</th>
                          <th className="px-4 py-3">Ism va familiya</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Roli</th>
                          <th className="px-4 py-3">Telefon</th>
                          <th className="px-4 py-3">A'zo bo'lgan kurslari</th>
                          <th className="px-4 py-3">Ro'yxatdan o'tgan sana</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {usersList.map((u) => (
                          <tr key={u.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-mono text-slate-400">#{u.id}</td>
                            <td className="px-4 py-3 font-semibold text-white">{u.full_name}</td>
                            <td className="px-4 py-3 text-sky-400">{u.email}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                u.role === 'admin'
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : 'bg-emerald-500/20 text-emerald-300'
                              }`}>
                                {u.role === 'admin' ? 'Boshqaruvchi' : 'O\'quvchi'}
                              </span>
                            </td>
                            <td className="px-4 py-3">{u.phone || '—'}</td>
                            <td className="px-4 py-3 text-slate-300">
                              {u.enrolled_courses?.length > 0 
                                ? u.enrolled_courses.join(', ') 
                                : '—'}
                            </td>
                            <td className="px-4 py-3 text-slate-400">{u.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 7: ALOQA XABARLARI */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    Saytdan Yuborilgan Aloqa Xabarlari ({messagesList.length})
                  </h4>

                  <div className="space-y-3">
                    {messagesList.length > 0 ? (
                      messagesList.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/30 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm">{msg.name}</span>
                            <span className="text-xs text-slate-400">{msg.created_at}</span>
                          </div>
                          <div className="text-xs text-sky-400 font-mono">
                            Aloqa: {msg.phone_or_email} | Mavzu: {msg.subject}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                            {msg.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-10">Hozircha xabarlar yo'q</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* MODAL: CREATE / EDIT COURSE */}
        {courseModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-xl rounded-2xl bg-[#0b122e] border border-white/20 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">
                  {editingCourse ? "Kursni Tahrirlash" : "Yangi Kurs Qo'shish"}
                </h4>
                <button onClick={() => setCourseModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kurs nomi *</label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Kategoriya</label>
                    <select
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/90 border border-white/10 text-white outline-none"
                    >
                      <option value="Dasturlash">Dasturlash</option>
                      <option value="Dizayn">Dizayn</option>
                      <option value="Sun'iy intellekt">Sun'iy intellekt</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Davomiyligi</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: 7 oy"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Darajasi</label>
                    <input
                      type="text"
                      value={courseForm.level}
                      onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Narxi</label>
                    <input
                      type="text"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bosh ustoz ismi</label>
                  <input
                    type="text"
                    value={courseForm.mentor_name}
                    onChange={(e) => setCourseForm({ ...courseForm, mentor_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kurs rasmi URL</label>
                  <input
                    type="text"
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Qisqacha tavsif *</label>
                  <textarea
                    required
                    rows="2"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCourseModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CREATE / EDIT MENTOR */}
        {mentorModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-2xl bg-[#0b122e] border border-white/20 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">
                  {editingMentor ? "Ustozni Tahrirlash" : "Yangi Ustoz Qo'shish"}
                </h4>
                <button onClick={() => setMentorModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveMentor} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Ism va familiya *</label>
                  <input
                    type="text"
                    required
                    value={mentorForm.full_name}
                    onChange={(e) => setMentorForm({ ...mentorForm, full_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Mutaxassisligi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Senior Backend Developer"
                    value={mentorForm.specialty}
                    onChange={(e) => setMentorForm({ ...mentorForm, specialty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Tajribasi</label>
                    <input
                      type="text"
                      value={mentorForm.experience}
                      onChange={(e) => setMentorForm({ ...mentorForm, experience: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">O'quvchilar soni</label>
                    <input
                      type="number"
                      value={mentorForm.students_count}
                      onChange={(e) => setMentorForm({ ...mentorForm, students_count: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Profil rasmi URL</label>
                  <input
                    type="text"
                    value={mentorForm.avatar}
                    onChange={(e) => setMentorForm({ ...mentorForm, avatar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Qisqacha bio</label>
                  <textarea
                    rows="2"
                    value={mentorForm.bio}
                    onChange={(e) => setMentorForm({ ...mentorForm, bio: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMentorModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CREATE / EDIT PROJECT */}
        {projectModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-2xl bg-[#0b122e] border border-white/20 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">
                  {editingProject ? "Loyihani Tahrirlash" : "Yangi Loyiha Qo'shish"}
                </h4>
                <button onClick={() => setProjectModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Loyiha nomi *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Muallif o'quvchi *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.author_name}
                      onChange={(e) => setProjectForm({ ...projectForm, author_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Kurs nomi</label>
                    <input
                      type="text"
                      value={projectForm.course_name}
                      onChange={(e) => setProjectForm({ ...projectForm, course_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Texnologiyalar (vergul bilan)</label>
                  <input
                    type="text"
                    placeholder="React, Tailwind, Node.js"
                    value={projectForm.tech_stack}
                    onChange={(e) => setProjectForm({ ...projectForm, tech_stack: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Rasm URL</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Demo havolasi</label>
                  <input
                    type="text"
                    value={projectForm.demo_url}
                    onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Loyiha tavsifi *</label>
                  <textarea
                    required
                    rows="2"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-white outline-none resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

