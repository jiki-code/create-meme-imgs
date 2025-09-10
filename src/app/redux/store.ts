// store.ts
import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";

export const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});

// Kiểu RootState và AppDispatch để dùng trong useSelector, useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
