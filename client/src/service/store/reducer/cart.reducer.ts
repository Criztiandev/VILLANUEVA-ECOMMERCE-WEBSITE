import { PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../slice/cart.slice";

interface ProductDetails {
  _id: string;
  quantity: number;
}

export default {
  addToCart: (state: CartState, action: PayloadAction<ProductDetails>) => {
    const newProducts = action.payload;

    // Check if a product with the same ID already exists
    const existingProductIndex = state.products.findIndex(
      (product) => product._id === newProducts._id
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, increase the quantity
      state.products[existingProductIndex].quantity += newProducts.quantity;
    } else {
      // If the product doesn't exist, add it to the products array
      state.products = [...state.products, newProducts];

      // Increase the count property
      state.count++;
    }
  },

  removeToCart: (state: CartState, action: PayloadAction<string>) => {
    const productIdToRemove = action.payload;
    state.products = state.products.filter(
      (product) => product._id !== productIdToRemove
    );
    state.count--;
  },

  clearCart: (state: CartState) => {
    state.products = [];
    state.count = 0;
  },

  toggleCart: (state: CartState) => {
    state.isActive = !state.isActive;
  },

  increaseQuantity: (state: CartState, action: PayloadAction<string>) => {
    state.products = state.products
      .map((product) =>
        product._id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
      .filter((product) => product.quantity > 0);
  },
  decreaseQuantity: (state: CartState, action: PayloadAction<string>) => {
    state.products = state.products
      .map((product) =>
        product._id === action.payload
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
      .filter((product) => product.quantity > 0);
  },
};
