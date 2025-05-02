import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  getAllAdmins,
  getAllUsers,
  updateUserStatus,
} from "./accounts.service";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
  errorMsg: "",
};

export const AccountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all admins
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.items = action.payload;
      });

    //get all users
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.items = action.payload;
      });

    // delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "User Delete failed";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.isError = false;
      });

    // update user status
    builder
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload || "User status update failed";
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload;

        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        state.isError = false;
      });
  },
});

export default AccountsSlice.reducer;
export const selectAccount = (state) => state.accounts;
