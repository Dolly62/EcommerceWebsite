import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductReducer";
import AuthReducer from "./AuthReducer";

const store = configureStore({
  reducer: {
    authentication: AuthReducer,
    products: ProductReducer,
  },
});

export default store;
