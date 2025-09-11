// store.ts
import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import templateReducer from "./templateSelected";


export const store = configureStore({
  reducer: {
    images: imageReducer,
    templates: templateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
