import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getLatestProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
} from "./product.service";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  totalProducts: 0,
  totalPages: 1,
  currentPage: 1,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all products
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      });

    //create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      });

    //delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      });

    //get product by id
    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      });

    //update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const index = state.products.findIndex(
          (item) => item._id === action.payload._id
        );
        state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      });

    //get product by category
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      });

    // get latest 6 products
    builder
      .addCase(getLatestProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getLatestProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getLatestProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const selectProduct = (state) => state.products;
