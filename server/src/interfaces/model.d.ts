export interface UserModel {
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

export interface CategoryModel {
  _id?: string;
  name: string;
  count?: number;
}

export interface MessageModel {
  _id?: string;
  target: string;
  sender: string;
  content: string;
  createdAt?: string;
}

export interface ConvoModel {
  title: string;
  participants: Array<string>;
  messages: Array<MessageModel>;
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
interface ProductsOrder {
  _id?: string;
  quantity: number;
}

export interface OrderModel {
  _id?: string;
  refID: string;
  UID?: string;
  products: Array<ProductsOrder>;
  fullName: string;
  address: string;
  contact: string;
  tax: number;
  shippingFee: number;
  total: number;
  medthod: "COD";
  status: "Pending" | "Processing" | "Delivered" | "Cancel";
  createdAt?: string;
}

export interface OrderPayload {
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
