import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config"

const API_URL = serverIP;
const GetEvents = "api/events/getEvents";
const AddEvent = "api/events/addEvent";

const initialState = {
  events: [],
  blockName: "all",
};

export const schedulerSlice = createSlice({
  name: "scheduler",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setBlockNameInSlice: (state, action) => {
      state.blockName = action.payload;
    },
  },
});

export const {
  setEvents,
  setBlockNameInSlice,
} = schedulerSlice.actions;

export const selectData = (state) => state.scheduler.events;
export const selectBlockName = (state) => state.scheduler.blockName;

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

  export const fetchEventsByBlock = (blockName ,alert) => async (dispatch) => {
    console.log(`api/events/getEvents/block/${blockName}`);
    try {
      const response = await axios.get(API_URL + `api/events/getEvents/block/${blockName}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      dispatch(setEvents(response.data));
      alert.success("Dane zostały załadowane.");
    } catch (error) {
      alert.error("Serwer nie odpowiada.");
    }
  };


  export const addEvent = (addEvent, alert) => async (dispatch) => {
    console.log("AddEvent");
    console.log(addEvent);
    try {
      await axios.post(API_URL + AddEvent, addEvent, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert.success("Event został dodany");
      dispatch(fetchEvents(alert));
    } catch (error) {
      if(error.response.status === 400){
        alert.error("Podana data jest nieprawidłowa.");
      }
      else{
        alert.error("Serwer nie odpowiada.");
      }
    }
  }

  export const deleteEvent = (eventId, alert) => async (dispatch) => {
    try {
      await axios.delete(API_URL + `api/events/deleteEvent/${eventId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert.success("Wydarzenie zostało usunięte.");
      dispatch(fetchEvents(alert));
    } catch (error) {
      alert.error("Serwer nie odpowiada.");
    }
  };

  export const changeEvent = (changeEvent, alert) => async (dispatch) => {
    console.log("ChangeEvent");
    console.log(changeEvent);
    try {
      await axios.put(API_URL + AddEvent, changeEvent, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert.success("Pomyślnie zmieniono wydarzenie.");
      dispatch(fetchEvents(alert));
    } catch (error) {
        alert.error("Serwer nie odpowiada.");
    }
  }

export default schedulerSlice.reducer;

