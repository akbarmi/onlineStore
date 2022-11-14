import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { menuListSlice } from "../components/header/menuListSlice";
import { accountSlice } from "../components/pages/account/accountSlice";
import { basketSlice } from "../components/pages/basket/basketSlice";
import { UploadImageSlice } from "../components/pages/managementPage/managementUploadImages/UploadImageSlice";
import { newProductSlice } from "../components/pages/managementPage/manageProductsSlice";
import { productList } from "../components/pages/productsList/producsListSlice";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
    account: accountSlice.reducer,
    uploadedImages: UploadImageSlice.reducer,
    newProduct: newProductSlice.reducer,
    category: menuListSlice.reducer,
    productList: productList.reducer,
  },
});

//https://redux-toolkit.js.org/tutorials/quick-start
// Infer the `RootState` and `AppDispatch` types from the store itself// folder7-vid5-9:21
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
