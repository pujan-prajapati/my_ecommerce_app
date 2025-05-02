import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrders,
  orderItem,
  updateOrderStatus,
  getOrderById,
  cancelOrder,
  deleteOrder,
  getUserOrders,
} from "./order.service";

const initialState = {
  orders: [],
  order: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  currentPage: 1,
  totalCount: 0,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all orders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = action.payload;
        console.log("action get payload : ", action.payload);
      });

    //order an item
    builder
      .addCase(orderItem.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(orderItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(orderItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = action.payload;
      });

    //update order status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = action.payload;
      });

    //get order by id
    builder
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.order = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = action.payload;
      });

    //cancel order
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = action.payload;
      });

    //delete order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload._id
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = action.payload;
      });

    //get user orders
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
        state.currentPage = action.payload.currentPage;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMsg = action.payload;
      });
  },
});

export default orderSlice.reducer;
export const selectOrder = (state) => state.order;
