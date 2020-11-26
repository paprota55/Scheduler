import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config";

const API_URL = serverIP;
const addressToPing = "api/settings/getArchiveTime";

const initialState = {
  newTime: 0,
};

const reducers = {
  setNewTime: (state, action) => {
    state.newTime = action.payload;
  },
  reset: (state) => {
    state.newTime = 0;
  },
};

export const userHeaderSettingsSlice = createSlice({
  name: "userHeaderSettings",
  initialState,
  reducers,
});

export const { setNewTime, reset } = userHeaderSettingsSlice.actions;

export const selectAll = (state) => state.userHeaderSettings;

export const selectNewTime = (state) => state.userHeaderSettings.newTime;

export const fetchArchiveTime = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL + addressToPing, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(setNewTime(response.data));
    
  } catch (error) {
    console.log("Nie mogę pobrać");
  }
};

export default userHeaderSettingsSlice.reducer;
