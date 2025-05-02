import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart, removeFromCart, updateCart } from "./cart.service";

const initialState = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    // get cart
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.items = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    // remove from cart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    // update cart item
    builder
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const updatedItem = state.items.find(
          (item) => item._id === action.payload._id
        );
        if (updatedItem) {
          updatedItem.quantity = action.payload.quantity;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export default cartSlice.reducer;
export const selectCart = (state) => state.cart;
