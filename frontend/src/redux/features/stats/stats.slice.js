import { createSlice } from "@reduxjs/toolkit";
import { getSales, getStats } from "./stats.service";

const initialState = {
  stats: {
    totalUser: 0,
    newuser: 0,
    totalSales: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    outOfStockProducts: 0,
  },
  salesData: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stats = {
          totalUsers: action.payload.totalUser,
          newUsers: action.payload.newuser,
          totalSales: action.payload.totalSales,
          totalOrders: action.payload.totalOrders,
          pendingOrders: action.payload.pendingOrders,
          totalProducts: action.payload.totalProducts,
          outOfStockProducts: action.payload.outOfStockProducts,
        };
      })
      .addCase(getStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    builder // Handle getSales async action
      .addCase(getSales.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.salesData = action.payload;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export default statsSlice.reducer;
export const selectStats = (state) => state.stats;
