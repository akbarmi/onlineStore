import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../../models/types";
interface product {
  id: number;
  title: string;
  brand: string;
  type: string;
  model: string;
  size: string;
  price: string;
  unit: null;
  inventory: number;
  sale_data: null;
  icon: null;
  short_images: [];
  images: [];
  category: string;
}

interface basket {
  product: product;
  product_id: number;
  qty: number;
}
interface BasketState {
  basket: basket[] | null;
}

const initialState: BasketState = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    addItem: (state, action) => {
      const { product, qty } = action.payload;
      const index = state.basket?.findIndex((i) => i.product_id === product.id);
      if (index !== undefined && index > -1) {
        state.basket![index].qty = qty;
      } else {
        const temp = {
          product: product,
          product_id: product.id,
          qty: qty,
        };
        state.basket?.push(temp);
      }
    },

    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.basket!.findIndex(
        (i) => i.product_id === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket![itemIndex].qty -= quantity;
      if (state.basket![itemIndex].qty === 0)
        state.basket!.splice(itemIndex, 1);
    },
    // deleteItem:(state,action)=>{
    //   const {productId}=action.payload;
    //   const itemIndex = state.basket!.findIndex(
    //     (i) => i.product_id === productId
    //   );
    //   if (itemIndex === -1 || itemIndex === undefined) return;
    //     state.basket!.splice(itemIndex, 1);

    // }
  },
});

export const { setBasket, removeItem, addItem } = basketSlice.actions;
