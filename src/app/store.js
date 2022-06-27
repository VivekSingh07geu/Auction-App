import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import productReducer from "../features/product/productSlice";
import userSlice from '../features/user/userSlice';
import productDetailReducer from '../features/user/userDetailSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userSlice,
    userDetail: productDetailReducer,
  },
});
