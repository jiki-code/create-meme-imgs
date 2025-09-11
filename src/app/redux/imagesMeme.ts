// imageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageItem } from "../types/general";

interface ImageState {
  list: ImageItem[];
}

const initialState: ImageState = {
  list: [],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<ImageItem[]>) => {
      state.list = action.payload;
    },
    addImage: (state, action: PayloadAction<ImageItem>) => {
      state.list.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((img) => img.id !== action.payload);
    },
    clearImages: (state) => {
      state.list = [];
    },
  },
});

export const { setImages, addImage, removeImage, clearImages } = imageSlice.actions;
export default imageSlice.reducer;
