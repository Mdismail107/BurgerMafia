export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image?: string;
  author: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

export interface AuthToken {
  access: string;
  refresh: string;
}

export interface DashboardStats {
  total_menu_items: number;
  total_blog_posts: number;
  total_contacts: number;
  recent_contacts: Contact[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}