export interface UserModel {
  _id?: string;

  // Details
  firstName: string;
  middleName: string;
  lastName: string;

  fullName?: string;

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
  images?: Array<string>;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  summary?: string;
  description?: string;
  shippingFee: number;
  isPublished: boolean;
  isFeatured: boolean;
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

export interface MessageModel {
  customer: string;
  message: string;
}

export interface ServiceModel {
  images?: Array<string>;
  name: string;
  price: number;

  scheduleStart: string;
  scheduleEnd: string;

  summary?: string;
  description?: string;
  isPublished: boolean;
  isFeatured: boolean;
  status: string;
}
