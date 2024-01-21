export interface UserModel {
  // Details
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  birthDate: string;
  contact: string;
  gender: string;

  // Address
  address: string;
  street: string;
  building: string;
  houseNo: string;
  postalCode: string;

  // Account
  email: string;
  password: string;
  role?: string;
}
export interface ProductModel {
  _id?: string;
  cover?: string;
  images?: Array<string>;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  summary?: string;
  shippingFee: number;
  description?: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface CartModel {
  _id: string;
  product: ProductModel;
  quantity: number;
  total: number;
}

export interface OrderModel {
  _id: string;
  user: UserModel;
  cart: CartModel[];
  total: number;
  status: "pending" | "paid" | "delivered";
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryModel {
  _id?: string;
  name: string;
  count?: number;
}
