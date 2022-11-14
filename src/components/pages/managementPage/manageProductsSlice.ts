import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../../api/Agent";

interface newProduct {
  title: string;
  brand: string;
  type: string;
  model: string;
  size: string;
  price: number;
  unit: string;
  inventory: number;
  sale_data: string;
  short_images: string[];
  images: string[];
  category: string;
}

const initialState = {
  newProductInfo: {
    title: "",
    brand: "",
    type: "",
    model: "",
    size: "",
    price: 0,
    unit: "",
    inventory: 0,
    sale_data: "",
    short_images: [],
    images: [],
    category: "",
  },
  editProductInfo: {
    title: "",
    brand: "",
    type: "",
    model: "",
    size: "",
    price: 0,
    unit: "",
    inventory: 0,
    sale_data: "",
    short_images: [],
    images: [],
    category: "",
  },
  allProducts: {
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
  currentURL: "",
  pages: [0],
};
export const getProductInfo = createAsyncThunk<newProduct, number>(
  "product/getProduct",
  async (productId, thunkAPI) => {
    try {
      const product = await agent.Product.getProduct(productId);
      return product.product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const getAllProducts = createAsyncThunk<any, string>(
  "product/getAllProducts",
  async (url, thunkAPI) => {
    try {
      const allproduct = await agent.Product.getAllProducts(url);
      return allproduct.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    setAllNewProductInfo: (state, action) => {
      Object.assign(state.newProductInfo, action.payload);
    },
    setEditProductInfo: (state, action) => {
      Object.assign(state.editProductInfo, action.payload);
    },
    setURL: (state, action) => {
      state.currentURL = action.payload;
    },
    deleteProduct: (state, action) => {
      const filteredData = state.allProducts.data.filter(
        (i) => i.id !== action.payload
      );
      state.allProducts.data = filteredData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductInfo.rejected, () => {});
    builder.addCase(getProductInfo.fulfilled, (state, action) => {
      Object.assign(state.editProductInfo, action.payload);
    });
    builder.addCase(getAllProducts.rejected, () => {});
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      Object.assign(state.allProducts, action.payload);
      state.pages = [];
      for (
        let i = 1;
        i <= Math.ceil(state.allProducts.total / state.allProducts.per_page);
        i++
      ) {
        state.pages.push(i);
      }
    });
  },
});
export const {
  setAllNewProductInfo,
  setEditProductInfo,
  setURL,
  deleteProduct,
} = newProductSlice.actions;
