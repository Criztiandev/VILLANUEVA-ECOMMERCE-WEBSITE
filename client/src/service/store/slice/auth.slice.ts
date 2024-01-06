import { createSlice } from "@reduxjs/toolkit";
import authReducer from "../reducer/auth.reducer";

export interface AuthState {
  token: string | null;
}

const storedInfo = localStorage.getItem("info");

const initialState: AuthState = {
  token: storedInfo ? JSON.parse(storedInfo) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: authReducer.setCredentials,
    clearCredentials: authReducer.revokeCredentials,
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
