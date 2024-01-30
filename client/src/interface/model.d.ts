/* eslint-disable @typescript-eslint/no-explicit-any */
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
  password?: string;
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

export interface ServiceModel {
  _id?: string;
  images?: Array<string>;
  name: string;
  category: string;

  slots: number;
  rate: number;
  startingPrice: number;
  description: string;
  services?: Array<string>;

  isPublished: boolean;
  isFeatured: boolean;
  status?: string;
}

export interface ServiceScheduleModel {
  _id?: string;
  serviceId: any;
  schedule: string;
  completionDate: string;
  customer: string;
  budget: number;
  status: string;
}

export interface RecentModel {
  no: string;
  customer: string;
  product: string;
  status: string;
  deliverAt: string;
  total: number;
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

interface RecentOrderModel {
  _id?: string;
  refID: string;
  status: string;
  date: string;
  price: string;
}

interface RecentService {
  _id?: string;
  name: string;
}

export interface CategoryModel {
  _id?: string;
  name: string;
  count?: number;
}

export interface MessageModel {
  _id?: string;
  target: string;
  sender?: string;
  content: string;
  createdAt?: string;
}

export interface ConvoModel {
  _id?: string;
  title: string;
  participants: Array<string>;
  messages: Array<MessageModel>;
}

interface ProductsOrder {
  _id?: string;
  quantity: number;
}

export interface OrderModel {
  refID?: string;
  _id?: string;
  UID?: string;
  products: Array<ProductsOrder>;
  fullName: string;
  address: string;
  contact: string;
  tax: number;
  shippingFee: number;
  total: number;
  medthod: "COD";
  createdAt?: string;
  status?: string;
}

export interface OrderPayload {
  _id?: string;
  refID: string;
  productName: string;
  quantity: number;
  price: number;
  fullName: string;
  purchasedDate: string;
  status: string;
  total: number;
  method: string;
}
