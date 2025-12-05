// store/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa trạng thái ban đầu
const initialState = {
  value: 0,
};

// Tạo slice 'counter'
export const counterSlice = createSlice({
  name: "counter", // Tên của slice
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit cho phép "mutating" state trực tiếp bên trong reducers
      // vì nó sử dụng Immer ở bên trong
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export các action creators được tạo tự động bởi createSlice
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

// Export reducer của slice
export default counterSlice.reducer;
