import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../../api/Agent";

interface newProduct {
  title: string;
  brand: string;
  type: string;
  model: string;
  size: number;
  price: number;
  unit: string;
  inventory: number;
  sale_data: string;
  short_images: string[];
  images: string[];
  category: string;
}
const initialState = {
  newProduct: {
    title: "",
    brand: "",
    type: "",
    model: "",
    size: 0,
    price: 0,
    unit: "",
    inventory: 0,
    sale_data: "",
    short_images: [],
    images: [],
    category: "",
  },

  searchedFilterdProducts: {
    current_page: 0,
    data: [{ id: 0, model: null, title: "" }],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    links: [],
    length: 0,
    next_page_url: "",
    path: "",
    per_page: 0,
    prev_page_url: "",
    to: 0,
    total: 0,
  },
  trendProducts: {
    current_page: 0,
    data: [{ id: 0, model: null, title: "", short_images: [], price: 0 }],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    links: [],
    length: 0,
    next_page_url: "",
    path: "",
    per_page: 0,
    prev_page_url: "",
    to: 0,
    total: 0,
  },
  currentURL: "",
  pages: [0],
};

export const getSearchedProducts = createAsyncThunk<any, string>(
  "product/getsearchedFilterdProducts",
  async (url, thunkAPI) => {
    try {
      const allproduct = await agent.Product.getSearchResults(url);
      return allproduct.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const getTrendProducts = createAsyncThunk<any, string>(
  "product/getTrendProducts",
  async (all, thunkAPI) => {
    try {
      const allproduct = await agent.Product.getSearchResults(all);
      return allproduct.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const productList = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    // setAllNewProductInfo: (state, action) => {
    //   Object.assign(state.newProductInfo, action.payload);
    // },
    // setEditProductInfo: (state, action) => {
    //   Object.assign(state.editProductInfo, action.payload);
    // },
    // setURL: (state, action) => {
    //   state.currentURL = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchedProducts.fulfilled, (state, action) => {
      Object.assign(state.searchedFilterdProducts, action.payload);
      state.pages = [];
      for (
        let i = 1;
        i <=
        Math.ceil(
          state.searchedFilterdProducts.total /
            state.searchedFilterdProducts.per_page
        );
        i++
      ) {
        state.pages.push(i);
      }
    });
    builder.addCase(getTrendProducts.fulfilled, (state, action) => {
      Object.assign(state.trendProducts, action.payload);
    });
    builder.addMatcher(
      isAnyOf(getSearchedProducts.rejected, getTrendProducts.rejected),
      () => {}
    );
  },
});
export const {} = productList.actions;
