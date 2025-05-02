import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpDelete, httpGet, httpPost, httpPut } from "../../../axios";
import { handleError } from "../../../helpers";

//create category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost("/category", formData, true);

      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//get all category
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet("/category");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//detelete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryID, { rejectWithValue }) => {
    try {
      const response = await httpDelete(`/category/${categoryID}`, true);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//get category by id
export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (categoryID, { rejectWithValue }) => {
    try {
      const response = await httpGet(`/category/${categoryID}`);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

//update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryID, formData }, { rejectWithValue }) => {
    try {
      const response = await httpPut(`/category/${categoryID}`, formData, true);
      return response.data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);
