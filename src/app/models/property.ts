export interface Property {
  _id: string;
  area: number;
  availabFrom: string;
  bathrooms: number;
  category: string;
  createdAt: string;
  description: string;
  images: string[];
  location: string;
  price: number;
  purpose: string;
  rooms: number;
  status: string;
  subCategory: string;
  title: string;
  updatedAt: string;
  addedBy: string
    features?: string[]; // ✅ أضف هذا السطر

}
