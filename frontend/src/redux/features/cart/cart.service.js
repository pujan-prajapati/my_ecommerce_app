import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpPost, httpGet, httpPut } from "../../../axios";

export const addToCart = createAsyncThunk(
  "addToCart",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost("/cart/addtocart", formData, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCart = createAsyncThunk(
  "getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet("/cart/getcart", null, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await httpPost("/cart/removefromcart", productId, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCart = createAsyncThunk(
  "updateCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await httpPut(
        "/cart/updatecartitem",
        { productId, quantity },
        true
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Server Error");
    }
  }
);
