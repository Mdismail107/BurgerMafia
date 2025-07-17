import axios from 'axios';
import { AuthToken, MenuItem, BlogPost, Contact, DashboardStats, User } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/admin/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (username: string, password: string) =>
    api.post<AuthToken>('/auth/login/', { username, password }),
  
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return Promise.resolve();
  },
  
  getCurrentUser: () => api.get<User>('/auth/user/'),
};

// Menu API
export const menuAPI = {
  getAll: () => api.get<MenuItem[]>('/menu/'),
  getBySlug: (slug: string) => api.get<MenuItem>(`/menu/${slug}/`),
  create: (data: Partial<MenuItem>) => api.post<MenuItem>('/admin/menu/', data),
  update: (slug: string, data: Partial<MenuItem>) => api.put<MenuItem>(`/admin/menu/${slug}/`, data),
  delete: (slug: string) => api.delete(`/admin/menu/${slug}/`),
};

// Blog API
export const blogAPI = {
  getAll: () => api.get<BlogPost[]>('/blogs/'),
  getBySlug: (slug: string) => api.get<BlogPost>(`/blogs/${slug}/`),
  create: (data: Partial<BlogPost>) => api.post<BlogPost>('/admin/blogs/', data),
  update: (slug: string, data: Partial<BlogPost>) => api.put<BlogPost>(`/admin/blogs/${slug}/`, data),
  delete: (slug: string) => api.delete(`/admin/blogs/${slug}/`),
};

// Contact API
export const contactAPI = {
  create: (data: Partial<Contact>) => api.post<Contact>('/contact/', data),
  getAll: () => api.get<Contact[]>('/admin/contacts/'),
  getById: (id: number) => api.get<Contact>(`/admin/contacts/${id}/`),
  markAsRead: (id: number) => api.patch(`/admin/contacts/${id}/`, { is_read: true }),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get<DashboardStats>('/admin/dashboard/'),
};

export default api;