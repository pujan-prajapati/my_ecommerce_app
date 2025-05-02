import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpDelete, httpGet, httpPut } from "../../../axios";
import { handleError } from "../../../helpers";

export const getAllAdmins = createAsyncThunk(
  "getAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet("users/getAllAdmins");
      return response;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet("users/getAllUsers");

      return response;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteuser",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await httpDelete(`users/${userID}`, true);

      return response.data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "updateuserstatus",
  async ({ userID, formData }, { rejectWithValue }) => {
    try {
      const response = await httpPut(
        `users/updateUserStatus/${userID}`,
        formData,
        true
      );
      return response.data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);
