export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image?: string;
  is_available: boolean;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  image?: string;
  created_at: string;
  author: string;
}