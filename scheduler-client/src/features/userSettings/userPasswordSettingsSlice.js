import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { commonInitialStateProps, commonReducers } from "./CommonProps";
import serverIP from "../../config"

const API_URL = serverIP;
const addressToPing = "api/modify/password";

const initialState = {
  ...commonInitialStateProps,
  newPassword: "",
};

const reducers = {
  ...commonReducers,
  setNewPassword: (state, action) => {
    state.newPassword = action.payload;
  },
  reset: (state) => {
    state.password = "";
    state.newPassword = "";
  },
};

export const userPasswordSettingsSlice = createSlice({
  name: "userPasswordSettings",
  initialState,
  reducers,
});

export const {
  setPassword,
  setNewPassword,
  setResponseMessage,
  setResultStatus,
  toggleSubmit,
  displayResults,
  stopDisplayingResults,
  reset,
} = userPasswordSettingsSlice.actions;

export const selectAll = (state) => state.userPasswordSettings;

export const updatePassword = (editAccount) => async (dispatch) => {
  try {
    dispatch(toggleSubmit(true));
    const response = await axios.put(
      API_URL + addressToPing,
      editAccount,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    dispatch(reset());
    dispatch(setResponseMessage("Hasło zostało zmienione."));
    dispatch(setResultStatus(true));
    dispatch(displayResults());
  } catch (error) {
    if (error.response.status === 406) {
      dispatch(setResponseMessage("Hasło jest niepoprawne."));
      dispatch(setResultStatus(false));
      dispatch(displayResults());
    } else {
      dispatch(setResponseMessage("Nie można zmienić hasła, spróbuj ponownie później."));
      dispatch(setResultStatus(false));
      dispatch(displayResults());
    }
  }
};

export default userPasswordSettingsSlice.reducer;
