export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  productCount: number;
}
