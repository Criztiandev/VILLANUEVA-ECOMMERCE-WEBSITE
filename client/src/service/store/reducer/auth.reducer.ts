import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../slice/auth.slice";

export default {
  setCredentials: (state: AuthState, action: PayloadAction<string>) => {
    state.token = action.payload;

    localStorage.setItem("info", JSON.stringify(action.payload));
  },

  revokeCredentials: (state: AuthState) => {
    state.token = null;
    localStorage.removeItem("info");
  },
};
