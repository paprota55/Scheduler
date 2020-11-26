import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { commonInitialStateProps, commonReducers } from "./CommonProps";
import serverIP from "../../config"

const API_URL = serverIP;
const addressToPing = "api/modify/archiveTime";

const initialState = {
  ...commonInitialStateProps,
  newTime: "",
};

const reducers = {
  ...commonReducers,
  setNewTime: (state, action) => {
    state.newTime = action.payload;
  },
  reset: (state) => {
    state.password = "";
    state.newTime = "";
  },
};

export const userArchiveSettingsSlice = createSlice({
  name: "userArchiveSettings",
  initialState,
  reducers,
});

export const {
  setPassword,
  setNewTime,
  setResponseMessage,
  setResultStatus,
  toggleSubmit,
  displayResults,
  stopDisplayingResults,
  reset,
} = userArchiveSettingsSlice.actions;

export const selectAll = (state) => state.userArchiveSettings;

export const selectNewTime = (state) => state.userArchiveSettings.newTime;

export const updateArchiveTime = (editAccount) => async (dispatch) => {
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
    dispatch(setResponseMessage("Czas archiwizacji został zmieniony."));
    dispatch(setResultStatus(true));
    dispatch(displayResults());
  } catch (error) {
    if (error.response.status === 409) {
      dispatch(setResponseMessage("Hasło jest niepoprawne."));
      dispatch(setResultStatus(false));
      dispatch(displayResults());
    } else if (error.response.status === 400){
      dispatch(setResponseMessage("Nie podałeś czasu."));
      dispatch(setResultStatus(false));
      dispatch(displayResults());
    }
    else {
    dispatch(setResponseMessage("Błąd serwera spróbuj później."));
      dispatch(setResultStatus(false));
      dispatch(displayResults());
    }
  }
};

export default userArchiveSettingsSlice.reducer;
