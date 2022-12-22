import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { User } from "../common/user.type";

const cookie = new Cookies();

const state = {
  isSignIn: cookie.get("token") !== undefined,
  userInfo: {} as User,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
    },
    login: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.userInfo.name = action.payload;
    },
    uploadIcon: (state, action: PayloadAction<string>) => {
      state.userInfo.iconUrl = action.payload;
    },
  },
});

export const { signIn, signOut, login, changeName, uploadIcon } =
  authSlice.actions;
