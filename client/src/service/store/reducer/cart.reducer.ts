import { PayloadAction } from "@reduxjs/toolkit";
import { CartState, ProductPayload } from "../slice/cart.slice";

export default {
  addToCart: (state: CartState, action: PayloadAction<ProductPayload>) => {
    const newProduct = action.payload;

    const existingProductIndex = state.products.findIndex(
      (item) => item._id === newProduct._id
    );

    if (existingProductIndex !== -1) {
      // Product already exists in the cart
      const updatedProducts = [...state.products];
      updatedProducts[existingProductIndex].quantity += newProduct.quantity;

      state.products = updatedProducts;
    } else {
      // Product does not exist in the cart, add it
      state.products = [...state.products, newProduct];
    }
  },

  removeToCart: (state: CartState, action: PayloadAction<string>) => {
    const productIdToRemove = action.payload;
    state.products = state.products.filter(
      (product) => product._id !== productIdToRemove
    );
  },

  clearCart: (state: CartState) => {
    state.products = [];
  },

  toggleCart: (state: CartState) => {
    state.isActive = !state.isActive;
  },

  increaseQuantity: (state: CartState, action: PayloadAction<string>) => {
    const productId = action.payload;

    const existingProductIndex = state.products.findIndex(
      (item) => item._id === productId
    );

    if (existingProductIndex !== -1) {
      // Product already exists in the cart
      const updatedProducts = [...state.products];
      updatedProducts[existingProductIndex].quantity += 1;

      state.products = updatedProducts;
    }
  },

  decreaseQuantity: (state: CartState, action: PayloadAction<string>) => {
    const productId = action.payload;

    const existingProductIndex = state.products.findIndex(
      (item) => item._id === productId
    );

    if (existingProductIndex !== -1) {
      // Product already exists in the cart
      const updatedProducts = [...state.products];
      updatedProducts[existingProductIndex].quantity -= 1;

      state.products = updatedProducts;
    }
  },
};
