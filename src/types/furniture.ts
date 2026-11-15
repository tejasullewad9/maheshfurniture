// File: src/types/furniture.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isVisible: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  description: string;
  material: string;
  mainImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
}

export interface SiteSettings {
  businessName: string;
  showroomAddress: string;
  whatsappNumber: string;
}