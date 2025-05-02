import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, setLocalStore } from "../../../helpers";
import { httpPost } from "../../../axios";

export const registerUser = createAsyncThunk(
  "registeruser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost("users/registerUser", formData);

      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginuser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost("users/loginUser", formData);

      if (response && response.data) {
        const { accessToken, user } = response.data;

        setLocalStore("accessToken", accessToken);
        setLocalStore("user", user);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Server Error");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutuser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpPost("users/logoutUser", {}, true);

      if (response) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }

      return response;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
