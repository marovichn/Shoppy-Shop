import { Review } from "@prisma/client";

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product{
  id:string
  category: Category
  name: string
  price: string
  isFeatured: boolean
  size: Size;
  color: Color;
  images: Image[];
  stockAmount?: string
  description?: string;
  brand: Brand;
  reviews: Review[]
}
export interface Brand {
  id: string;
  storeId: string;
  name: string;
  description: string;
  images: Image[];
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Image{
  id:string
  url:string
}

export interface Color{
  id: string
  name:string
  value: string
}

export interface Size{
  id: string
  name:string
  value: string
}
export interface User {
  id: string;
  email: string;
  storeId: string;
  hashedPassword: string;
  name: string;
  lastname: string;
  age: string;
  gender: string;
  promocodes?:any;
} 

type Variant = "LOGIN" | "REGISTER";

export default Variant;