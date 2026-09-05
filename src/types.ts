export interface Dish {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image?: string;
  description?: string;
  isFeatured?: boolean;
  unit?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  image?: string;
  description?: string;
  dishCount?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string;
  image?: string;
  author?: string;
}

export interface StoreBranch {
  id: string;
  name: string;
  address: string;
  district: string;
  hotline: string;
  email: string;
  hours?: string;
  mapQuery?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  note?: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  branchId: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}
