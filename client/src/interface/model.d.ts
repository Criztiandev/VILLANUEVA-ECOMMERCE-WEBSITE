export interface UserModel {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  role?: "admin" | "user" | "guest";
}

export interface ProductModel {
  _id?: string;
  images?: Array<string>;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  isPublished: boolean;
}

export interface ProductDetails {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CartModel {
  _id: string;
  product: ProductModel;
  quantity: number;
  total: number;
}

export interface OrderModel {
  _id?: string;
  UID?: string;
  OID: string;
  quantity: number;
  ammount: number;
  address: string;
  status: "pending" | "paid" | "delivered";
  purchasedAt: Date;
}

export interface CategoryModel {
  _id?: string;
  name: string;
  count?: number;
}

export interface CustomerModel {
  _id?: string;
  fullName: string;
  contact: string;
  email: string;
  address: string;
  gender: string;
  age: number;
}

export interface ServiceMode {}