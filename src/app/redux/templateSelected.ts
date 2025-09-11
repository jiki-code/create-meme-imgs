import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Template {
  id: string;
  title: string;
  url: string;
}

interface TemplateState {
  data: Template[];
  isAction: boolean;
  selected: Template | null;
}

const initialState: TemplateState = {
  data: [],
  isAction: false,
  selected: null,
};

const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<Template[]>) => {
      state.data = action.payload;
    },
    selectTemplate: (state, action: PayloadAction<Template>) => {
      state.selected = action.payload;
    },
  },
});

export const { setTemplates, selectTemplate } = templateSlice.actions;
export default templateSlice.reducer;
