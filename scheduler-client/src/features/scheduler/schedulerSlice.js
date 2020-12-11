import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config"

const API_URL = serverIP;
const GetEvents = "api/events/getEvents";
const AddEvent = "api/events/addEvent";

const initialState = {
  events: [],
};

export const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const {
  setEvents,
} = schedulerSlice.actions;

export const selectData = (state) => state.scheduler.events;

export const fetchEvents = (alert) => async (dispatch) => {
    try {
      const response = await axios.get(API_URL + GetEvents, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(setEvents(response.data));
      console.log(response.data);
      alert.success("Dane zostały załadowane.");
    } catch (error) {
      alert.error("Serwer nie odpowiada.");
    }
  };

  export const addEvent = (addEvent, alert) => async (dispatch) => {
    try {
      await axios.post(API_URL + AddEvent, addEvent, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert.success("Event został dodany");
    } catch (error) {
        alert.error("Serwer nie odpowiada.");
    }
  }

  export const deleteEvent = (eventId, alert) => async (dispatch) => {
    try {
      await axios.delete(API_URL + `api/events/deleteEvent/${eventId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      alert.success("Operacja przebiegła pomyślnie.");
    } catch (error) {
      console.log(error)
      alert.error("Serwer nie odpowiada.");
    }
  };

export default schedulerSlice.reducer;

