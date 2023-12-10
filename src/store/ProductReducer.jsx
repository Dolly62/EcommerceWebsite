import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productItems: [],
    totalAmount: 0,
  },
  reducers: {
    addProduct(state, action) {
      state.productItems.push(action.payload);
      state.totalAmount += action.payload.newPrice;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
