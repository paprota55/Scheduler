import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config"

const API_URL = serverIP + "register";

const initialState = {
  email: "",
  login: "",
  password: "",
  rePassword: "",
  didSubmit: false,
  success: false,
  response: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    emailChange: (state, action) => {
      state.email = action.payload;
    },

    loginChange: (state, action) => {
      state.login = action.payload;
    },

    passwordChange: (state, action) => {
      state.password = action.payload;
    },

    rePasswordChange: (state, action) => {
      state.rePassword = action.payload;
    },

    toggleDidSubmit: (state, action) => {
      state.didSubmit = action.payload;
    },

    toggleSuccess: (state, action) => {
      state.success = action.payload;
    },

    toggleResponse: (state, action) => {
      state.response = action.payload;
    },

    reset: (state) => {
      state.email = "";
      state.login = "";
      state.password = "";
      state.rePassword = "";
    },
  },
});

export const {
  emailChange,
  loginChange,
  passwordChange,
  rePasswordChange,
  toggleDidSubmit,
  toggleSuccess,
  toggleResponse,
  reset,
} = registerSlice.actions;

export const selectAll = (state) => state.register;

export const register = (user) => async (dispatch) => {
  try {
    await axios.post(API_URL, user, {
    });
    dispatch(toggleSuccess(true)); 
    dispatch(reset()); 
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) 
      {
        dispatch(toggleResponse(true));
        dispatch(toggleSuccess(false));
      } 
      else 
      {
        dispatch(toggleResponse(false));
        dispatch(toggleSuccess(false));
      }
    } 
    console.log(error);
  }
};

export default registerSlice.reducer;
