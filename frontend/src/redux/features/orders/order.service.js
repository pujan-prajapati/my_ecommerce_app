import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpDelete, httpGet, httpPost, httpPut } from "../../../axios";
import { handleError } from "../../../helpers";

//get all orders
export const getAllOrders = createAsyncThunk(
  "getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const reponse = await httpGet("/orders");
      return reponse.data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

//orders item
export const orderItem = createAsyncThunk(
  "orderItem",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await httpPost("/orders", formData, true);
      return response.data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

//update order status
export const updateOrderStatus = createAsyncThunk(
  "updateOrderStatus",
  async ({ orderID, formData }, { rejectWithValue }) => {
    try {
      const response = await httpPut(
        `/orders/updateorderstatus/${orderID}`,
        formData,
        true
      );
      return response.data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

//delete order
export const deleteOrder = createAsyncThunk(
  "deleteOrder",
  async (orderID, { rejectWithValue }) => {
    try {
      const response = await httpDelete(`/orders/deleteorder/${orderID}`, true);
      return response.data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

//get order by id
export const getOrderById = createAsyncThunk(
  "getOrderById",
  async (orderID, { rejectWithValue }) => {
    try {
      const response = await httpGet(`/orders/getorder/${orderID}`, null, true);
      return response.data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

//cancel order
export const cancelOrder = createAsyncThunk(
  "cancelOrder",
  async ({ orderID }, { rejectWithValue }) => {
    try {
      const response = await httpPut(
        `/orders/cancelOrder/${orderID}`,
        {},
        true
      );
      return response.data;
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);

//get user orders
export const getUserOrders = createAsyncThunk(
  "getUserOrders",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      const response = await httpGet(`/orders/getuserorders`, params, true);
      const { orders, totalPages, currentPage, totalCount } = response.data;
      return { orders, totalPages, currentPage, totalCount };
    } catch (error) {
      handleError(error, rejectWithValue);
    }
  }
);
