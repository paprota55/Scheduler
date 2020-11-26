import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { commonInitialStateProps, commonReducers } from "./CommonProps";
import serverIP from "../../config"

const API_URL = serverIP;
const addressToPing = "api/modify/email";

const initialState = {
  ...commonInitialStateProps,
  newEmail: "",
};

const reducers = {
  ...commonReducers,
  setNewEmail: (state, action) => {
    state.newEmail = action.payload;
  },
  reset: (state) => {
    state.password = "";
    state.newEmail = "";
  },
};

export const userEmailSettingsSlice = createSlice({
  name: "userEmailSettings",
  initialState,
  reducers,
});

export const {
  setPassword,
  setNewEmail,
  setResponseMessage,
  setResultStatus,
  toggleSubmit,
  displayResults,
  stopDisplayingResults,
  reset,
} = userEmailSettingsSlice.actions;

export const selectAll = (state) => state.userEmailSettings;

export const updateEmail = (editAccount) => async (dispatch) => {
  try {
    dispatch(toggleSubmit(true));
    const response = await axios.put(API_URL + addressToPing, editAccount, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(reset());
    dispatch(setResponseMessage("Email został zaktualizowany."));
    dispatch(setResultStatus(true));
    dispatch(displayResults());
  } catch (error) {
    if (error.response.status === 406) {
      dispatch(setResponseMessage("Hasło jest nieprawidłowe."));
      dispatch(setResultStatus(false));
      dispatch(displayResults());
    } else {
      dispatch(setResponseMessage("Nie można zaktualizować emaila."));
      dispatch(setResultStatus(false));
      dispatch(displayResults());
    }
  }
};

export default userEmailSettingsSlice.reducer;
