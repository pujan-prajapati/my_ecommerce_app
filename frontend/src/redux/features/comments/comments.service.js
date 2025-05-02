import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpGet, httpPost, httpDelete } from "../../../axios";

export const addComment = createAsyncThunk(
  "addComment",
  async ({ productId, comment }, { rejectWithValue }) => {
    try {
      const response = await httpPost("/comment", { productId, comment }, true);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "getAllComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpGet("/comment");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComments = createAsyncThunk(
  "getComments",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await httpGet(`/comment/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommentById = createAsyncThunk(
  "getCommentById",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await httpGet(`/comment/getCommentById/${commentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await httpDelete(`/comment/${commentId}`, true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const replyComment = createAsyncThunk(
  "replyComment",
  async ({ commentId, reply }, { rejectWithValue }) => {
    try {
      const response = await httpPost(
        "/comment/reply",
        { commentId, reply },
        true
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
