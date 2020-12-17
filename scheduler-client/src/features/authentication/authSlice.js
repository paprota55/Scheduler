import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config"

const API_URL = serverIP + "login";

const initialState = {
  success: false,
  failed: false,
  redirectTo: "",
  shouldRedirect: false,
  errorMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRedirectAddress: (state, action) => {
      state.redirectTo = action.payload;
    },
    allowRedirect: (state, action) => {
      state.shouldRedirect = action.payload;
    },
    setFailed: (state, action) => {
      state.failed = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setRedirectAddress,
  allowRedirect,
  setFailed,
  setErrorMessage,
} = authSlice.actions;

export const selectAll = (state) => state.auth;

export const login = ({ login, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, {
        login: login,
        password: password,
      });
      const { token, role } = response.data;
      localStorage.setItem("blockInfo", "Aktualnie ładujesz wszystkie swoje wydarzenia.")
      localStorage.setItem("token", token);
      dispatch(setRedirectAddress("/userPage"));
      dispatch(allowRedirect(true));
      dispatch(setFailed(false));
      dispatch(setErrorMessage(""));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          dispatch(setFailed(true));
          dispatch(setErrorMessage("Login lub hasło jest nieprawidłowe."));
        } else {
          dispatch(setFailed(true));
          dispatch(setErrorMessage("Nie można zalogować."));
        }
      } else {
        dispatch(setFailed(true));
        dispatch(setErrorMessage("Nie można połączyć z serwerem."));
      }
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(setRedirectAddress("/login"));
    dispatch(allowRedirect(false));
  };
};

export default authSlice.reducer;
