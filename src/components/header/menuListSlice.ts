import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/Agent";
interface category {
  listLevelOne: any[];
}
const initialState: category = {
  listLevelOne: [],
};
export const getCategories = createAsyncThunk<any, void>(
  "menuList/allCategories",
  async () => {
    const res = await agent.Product.getClassification().catch(console.error);
    return res;
  }
);

export const menuListSlice = createSlice({
  name: "menuList",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.listLevelOne = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.listLevelOne = action.payload.success.products_category.data;
    });
  },
});

export const { setCategories } = menuListSlice.actions;
