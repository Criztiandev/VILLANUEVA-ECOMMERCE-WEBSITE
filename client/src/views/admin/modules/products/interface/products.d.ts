export interface ProductSchema {
  productImg: Array<string> | string;
  title: string;
  price: number;
  description: string;
  stocks: number;
  tags: string;
  category: "all" | "tress" | "plants" | "indoor" | "outdoor" | "shrubs";
}
