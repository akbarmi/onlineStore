import { createSlice } from "@reduxjs/toolkit";

interface ImageList {
  uploadedImages: { id: string; name: string }[];
  copiedImagesLink: string[];
}

const initialState: ImageList = {
  uploadedImages: [],
  copiedImagesLink: [],
};
export const UploadImageSlice = createSlice({
  name: "uploadimage",
  initialState,
  reducers: {
    setCopiedImagesLinks: (state, action) => {
      state.copiedImagesLink = action.payload;
    },
    setUploadedImagesLinks: (state, action) => {
      state.uploadedImages = action.payload;
    },
  },
});

export const { setUploadedImagesLinks, setCopiedImagesLinks } =
  UploadImageSlice.actions;
