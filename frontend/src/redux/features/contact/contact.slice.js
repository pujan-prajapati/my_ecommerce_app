import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpPost } from "../../../axios";

export const contactUs = createAsyncThunk(
  "contactUs",
  async ({ name, email, phone, message }, { rejectWithValue }) => {
    try {
      const response = await httpPost(
        "/contact",
        { name, email, phone, message },
        true
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
