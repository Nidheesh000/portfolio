import axios from 'axios';

// Create custom Axios instance
const API = axios.create({
  baseURL: '',
});

// Interceptor to inject JWT token in header
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Projects Services
export const getProjects = async (params) => {
  const { data } = await API.get('/api/projects', { params });
  return data;
};

export const getProject = async (id) => {
  const { data } = await API.get(`/api/projects/${id}`);
  return data;
};

export const createProject = async (projectData) => {
  // projectData can be FormData for uploads
  const { data } = await API.post('/api/projects', projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  // projectData can be FormData for uploads
  const { data } = await API.put(`/api/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await API.delete(`/api/projects/${id}`);
  return data;
};

// Skills Services
export const getSkills = async () => {
  const { data } = await API.get('/api/skills');
  return data;
};

export const createSkill = async (skillData) => {
  const { data } = await API.post('/api/skills', skillData);
  return data;
};

export const updateSkill = async (id, skillData) => {
  const { data } = await API.put(`/api/skills/${id}`, skillData);
  return data;
};

export const deleteSkill = async (id) => {
  const { data } = await API.delete(`/api/skills/${id}`);
  return data;
};

// Contact Services
export const submitContactMessage = async (messageData) => {
  const { data } = await API.post('/api/contact', messageData);
  return data;
};

export const getContactMessages = async () => {
  const { data } = await API.get('/api/contact');
  return data;
};

export const updateMessageStatus = async (id, isRead) => {
  const { data } = await API.put(`/api/contact/${id}`, { isRead });
  return data;
};

export const deleteContactMessage = async (id) => {
  const { data } = await API.delete(`/api/contact/${id}`);
  return data;
};

// Admin Dashboard Stats Service
export const getDashboardStats = async () => {
  const { data } = await API.get('/api/contact/stats');
  return data;
};
