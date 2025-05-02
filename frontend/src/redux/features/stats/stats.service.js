import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet } from "../../../axios";

export const getStats = createAsyncThunk(
  "getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet("/stats/overview");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSales = createAsyncThunk(
  "getSales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet("/stats/getsales");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
