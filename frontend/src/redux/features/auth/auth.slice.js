import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./auth.service";

import { getLocalStore } from "../../../helpers";

const user = getLocalStore("user");

const initialState = {
  items: user || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  registerSuccess: false,
  errorMsg: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.items = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.registerSuccess = false;
      state.errorMsg = "";
    },
  },
  extraReducers: (builder) => {
    //register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.registerSuccess = false;
        state.errorMsg = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.registerSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Registration failed";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registerSuccess = true;
        state.items = action.payload;
        state.isError = false;
      });

    //login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.registerSuccess = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Login failed";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.user;
        state.isError = false;
      });

    //logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "Logout failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.registerSuccess = false;
        state.errorMsg = "";
        state.items = null;
      });
  },
});

export default authSlice.reducer;
export const selectAuth = (state) => state.auth;
export const { reset } = authSlice.actions;
