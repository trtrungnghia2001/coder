// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { apiSlice } from "./apiSlice";

// Cấu hình Redux store
const store = configureStore({
  reducer: {
    counter: counterReducer, // Kết nối reducer của slice 'counter'
    // Thêm các reducer khác nếu có

    [apiSlice.reducerPath]: apiSlice.reducer, // Add the API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the API slice middleware
});

// Export store để có thể sử dụng trong ứng dụng
export default store;

// Export type của RootState để sử dụng TypeScript (tùy chọn)
export type RootState = ReturnType<typeof store.getState>;

// Export type của Dispatch để sử dụng TypeScript (tùy chọn)
export type AppDispatch = typeof store.dispatch;

// Create a type-safe useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Create a type-safe useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
