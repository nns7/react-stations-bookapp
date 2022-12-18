import { createSlice } from "@reduxjs/toolkit";

const state = {
  offset: 0,
};

export const offsetSlice = createSlice({
  name: "offset",
  initialState: state,
  reducers: {
    increase: (state) => {
      state.offset += 10;
    },
    decrease: (state) => {
      state.offset -= 10;
    },
  },
});

export const { increase, decrease } = offsetSlice.actions;
