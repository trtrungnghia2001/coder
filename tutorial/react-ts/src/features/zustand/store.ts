// store.js
import { create } from "zustand";

// Định nghĩa interface cho trạng thái (tùy chọn)
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (newCount: number) => void;
}

// Tạo store Zustand
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (newCount) => set({ count: newCount }),
}));
