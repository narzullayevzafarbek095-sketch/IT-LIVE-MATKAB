// API Client for IT LIVE Platform
const API_BASE = '/api';

export const getStoredToken = () => {
  return localStorage.getItem('itlive_token') || null;
};

export const setStoredToken = (token) => {
  if (token) {
    localStorage.setItem('itlive_token', token);
  } else {
    localStorage.removeItem('itlive_token');
  }
};

export const getStoredUser = () => {
  try {
    const u = localStorage.getItem('itlive_user');
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem('itlive_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('itlive_user');
  }
};

async function request(endpoint, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = data?.detail || data?.message || 'Server xatoligi yuz berdi';
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Public
  getStats: () => request('/stats'),
  getCourses: (category) => request(`/courses${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getCourseDetail: (id) => request(`/courses/${id}`),
  getMentors: () => request('/mentors'),
  getProjects: () => request('/projects'),
  submitRegistration: (data) => request('/registrations', { method: 'POST', body: JSON.stringify(data) }),
  submitContact: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request('/auth/me'),

  // Student Cabinet
  getStudentDashboard: () => request('/student/dashboard'),
  submitAssignment: (data) => request('/student/assignments/submit', { method: 'POST', body: JSON.stringify(data) }),
  enrollCourse: (courseId) => request(`/student/enroll/${courseId}`, { method: 'POST' }),

  // Admin Dashboard
  getAdminDashboard: () => request('/admin/dashboard'),
  updateStats: (data) => request('/admin/stats', { method: 'PUT', body: JSON.stringify(data) }),
  getRegistrations: () => request('/admin/registrations'),
  updateRegistrationStatus: (id, status) => request(`/admin/registrations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteRegistration: (id) => request(`/admin/registrations/${id}`, { method: 'DELETE' }),
  
  createCourse: (data) => request('/admin/courses', { method: 'POST', body: JSON.stringify(data) }),
  updateCourse: (id, data) => request(`/admin/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCourse: (id) => request(`/admin/courses/${id}`, { method: 'DELETE' }),

  createMentor: (data) => request('/admin/mentors', { method: 'POST', body: JSON.stringify(data) }),
  updateMentor: (id, data) => request(`/admin/mentors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMentor: (id) => request(`/admin/mentors/${id}`, { method: 'DELETE' }),

  createProject: (data) => request('/admin/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) => request(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id) => request(`/admin/projects/${id}`, { method: 'DELETE' }),

  getUsers: () => request('/admin/users'),
  getMessages: () => request('/admin/messages')
};

