import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CoursesSection from './components/CoursesSection';
import MentorsSection from './components/MentorsSection';
import ProjectsSection from './components/ProjectsSection';
import RegistrationSection from './components/RegistrationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import AuthModal from './components/AuthModal';
import CourseDetailModal from './components/CourseDetailModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import StudentDashboardModal from './components/StudentDashboardModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import Toast from './components/Toast';

import { 
  api, 
  getStoredToken, 
  getStoredUser, 
  setStoredToken, 
  setStoredUser 
} from './api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetailOpen, setCourseDetailOpen] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDetailOpen, setProjectDetailOpen] = useState(false);

  const [studentDashboardOpen, setStudentDashboardOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Pre-selected course for registration form
  const [enrollCourseTarget, setEnrollCourseTarget] = useState(null);

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const showToast = ({ message, type = 'success' }) => {
    setToast({ message, type });
  };

  // Initial Data Fetch
  useEffect(() => {
    // Check saved token and user
    const savedUser = getStoredUser();
    if (savedUser) {
      setCurrentUser(savedUser);
      // Validate session in background
      api.getMe()
        .then(u => {
          setCurrentUser(u);
          setStoredUser(u);
        })
        .catch(() => {
          setStoredToken(null);
          setStoredUser(null);
          setCurrentUser(null);
        });
    }

    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [statsData, coursesData, mentorsData, projectsData] = await Promise.all([
        api.getStats().catch(() => null),
        api.getCourses().catch(() => []),
        api.getMentors().catch(() => []),
        api.getProjects().catch(() => [])
      ]);

      if (statsData) setStats(statsData);
      if (coursesData) setCourses(coursesData);
      if (mentorsData) setMentors(mentorsData);
      if (projectsData) setProjects(projectsData);
    } catch (err) {
      console.error("Initial load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    setStoredToken(null);
    setStoredUser(null);
    setCurrentUser(null);
    setStudentDashboardOpen(false);
    setAdminDashboardOpen(false);
    showToast({ message: "Tizimdan muvaffaqiyatli chiqdingiz", type: 'info' });
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setCourseDetailOpen(true);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setProjectDetailOpen(true);
  };

  const handleEnrollClick = (course) => {
    setEnrollCourseTarget(course);
    const element = document.querySelector('#register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    showToast({ 
      message: `"${course.title}" tanlandi. Ro'yxatdan o'tish formasini to'ldiring.`, 
      type: 'info' 
    });
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 selection:bg-sky-500 selection:text-white relative">
      
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Global Navbar */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenStudentDashboard={() => setStudentDashboardOpen(true)}
        onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* Main Landing Sections */}
      <main>
        <HeroSection
          onExploreCourses={() => {
            const el = document.querySelector('#courses');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onContactClick={() => {
            const el = document.querySelector('#register');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <AboutSection stats={stats} />

        <CoursesSection
          courses={courses}
          onSelectCourse={handleCourseClick}
          onEnrollCourse={handleEnrollClick}
        />

        <MentorsSection mentors={mentors} />

        <ProjectsSection
          projects={projects}
          onSelectProject={handleProjectClick}
        />

        <RegistrationSection
          courses={courses}
          preSelectedCourse={enrollCourseTarget}
          onShowToast={showToast}
        />

        <ContactSection onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer courses={courses} />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authInitialMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setAdminDashboardOpen(true);
          } else {
            setStudentDashboardOpen(true);
          }
        }}
        onShowToast={showToast}
      />

      <CourseDetailModal
        isOpen={courseDetailOpen}
        course={selectedCourse}
        onClose={() => setCourseDetailOpen(false)}
        onEnroll={handleEnrollClick}
      />

      <ProjectDetailModal
        isOpen={projectDetailOpen}
        project={selectedProject}
        onClose={() => setProjectDetailOpen(false)}
      />

      <StudentDashboardModal
        isOpen={studentDashboardOpen}
        onClose={() => setStudentDashboardOpen(false)}
        currentUser={currentUser}
        onShowToast={showToast}
      />

      <AdminDashboardModal
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        currentUser={currentUser}
        onShowToast={showToast}
        onRefreshData={loadInitialData}
      />

    </div>
  );
}
