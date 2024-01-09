export interface ProductSchema {
  productImg: Array<string> | string;
  name: string;
  price: number;
  rating: number;
  description: string;
  keywords: Array<string>;
  quantity: number;
  stocks: number;
  regularPrice: number;
  shipping: number;
  category: "indoor" | "outdoor" | "accessories" | "sessional" | "gift";
}
