import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config"

const API_URL = serverIP;
const GetEvents = "api/expiredEvents/getEvents";

const initialState = {
  events: [],
};

export const schedulerHistorySlice = createSlice({
  name: "schedulerHistory",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const {
  setEvents,
} = schedulerHistorySlice.actions;

export const selectData = (state) => state.schedulerHistory.events;

export const fetchEvents = (alert) => async (dispatch) => {
    try {
      const response = await axios.get(API_URL + GetEvents, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      dispatch(setEvents(response.data));
      alert.success("Dane zostały załadowane.");
    } catch (error) {
      alert.error("Serwer nie odpowiada.");
    }
  };


export default schedulerHistorySlice.reducer;

