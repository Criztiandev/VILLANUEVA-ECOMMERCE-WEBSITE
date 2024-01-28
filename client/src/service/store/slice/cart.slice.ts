import { createSlice } from "@reduxjs/toolkit";
import cartReducer from "../reducer/cart.reducer";

export interface CartState {
  isActive: boolean;
  products: ProductPayload[];
}

export interface ProductPayload {
  _id: string;
  quantity: number;
  price?: number;
}
const CartState: CartState = {
  isActive: false,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: CartState,
  reducers: {
    toggleCart: cartReducer.toggleCart,
    addToCart: cartReducer.addToCart,
    removeToCart: cartReducer.removeToCart,
    clearCart: cartReducer.removeToCart,
    increaseQuantity: cartReducer.increaseQuantity,
    decreaseQuantity: cartReducer.decreaseQuantity,
  },
});

export const {
  toggleCart,
  addToCart,
  removeToCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
