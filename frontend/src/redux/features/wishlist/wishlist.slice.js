import { createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  getAllWishlist,
  removeFromWishlist,
} from "./wishlist.service";

const initialState = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.items.push(action.payload);
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    builder
      .addCase(getAllWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.items = action.payload;
      })
      .addCase(getAllWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    builder
      .addCase(removeFromWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
export const selectWishlist = (state) => state.wishlist;
