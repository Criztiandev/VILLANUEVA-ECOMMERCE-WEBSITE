import { createSlice } from "@reduxjs/toolkit";
import cartReducer from "../reducer/cart.reducer";

export interface CartState {
  isActive: boolean;
  count: number;
  products: CartPayload[];
}

export interface CartPayload {
  _id: string;
  quantity: number;
  price?: number;
}
const CartState: CartState = {
  isActive: false,
  count: 0,
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

export const { toggleCart, addToCart, removeToCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
