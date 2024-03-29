import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./slice/auth.slice";
import modalReducer, { ModalState } from "./slice/modal.slice";
import tableReducer, { TableState } from "./slice/table.slice";
import cartReducer, { CartState } from "./slice/cart.slice";

export interface RootReducer {
  auth: AuthState;
  modal: ModalState;
  table: TableState;
  cart: CartState;
}

const rootReducer: Reducer<RootReducer> = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  table: tableReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
