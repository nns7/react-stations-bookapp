import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { offsetSlice } from "./offsetSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    offset: offsetSlice.reducer,
  },
});
