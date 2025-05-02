import { createSlice } from "@reduxjs/toolkit";
import { addReview, getReviews } from "./reviews.service";

const initialState = {
  reviews: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  totalReviews: 0,
  totalPages: 1,
  currentPage: 1,
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //add review
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    //get all reviews
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviews = action.payload;
        // state.totalReviews = action.payload.totalReviews;
        // state.totalPages = action.payload.totalPages;
        // state.currentPage = action.payload.currentPage;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
export const selectReviews = (state) => state.reviews;
