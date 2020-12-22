import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config"

const API_URL = serverIP;
const GetEvents = "api/events/getEvents";
const AddEvent = "api/events/addEvent";
const GetEventByBlockName = "api/events/getEvents/";
const ChangeEventByEventId = "api/events/changeEvent/";
const DeleteEventByEventId = "api/events/deleteEvent/";
const GetEventByBlock = "api/events/getEvents/block/";

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
      dispatch(setEvents(response.data));
      alert.success("Dane zostały załadowane.");
    } catch (error) {
      alert.error("Serwer nie odpowiada.");
    }
  };

  export const fetchEventsByBlock = (blockName ,alert) => async (dispatch) => {
    try {
      const response = await axios.get(API_URL + GetEventByBlock + `${blockName}`,{
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


  export const addEvent = (addEvent,blockName, alert) => async (dispatch) => {
    if(addEvent.blockId === null){
      addEvent.blockId = 0;
    }
    try {
      await axios.post(API_URL + AddEvent, addEvent, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert.success("Wydarzenie zostało utworzone.");
      dispatch(fetchCurrentData(blockName, alert));
    } catch (error) {
      if(error.response.status === 400){
        alert.error("Podana data jest nieprawidłowa.");
      }
      else{
        alert.error("Serwer nie odpowiada.");
      }
    }
  }

  export const deleteEvent = (eventId,blockName, alert) => async (dispatch) => {
    try {
      await axios.delete(API_URL + DeleteEventByEventId + `${eventId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert.success("Wydarzenie zostało usunięte.");
      dispatch(fetchCurrentData(blockName, alert));
    } catch (error) {
      alert.error("Serwer nie odpowiada.");
    }
  };

  export const changeEvent = (changeEvent,blockName, alert) => async (dispatch) => {
    if(changeEvent.blockId === null){
      changeEvent.blockId = 0;
    }
    try {
      await axios.put(API_URL + ChangeEventByEventId + `${changeEvent.id}`, changeEvent, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert.success("Pomyślnie zmieniono wydarzenie.");
      dispatch(fetchCurrentData(blockName, alert));
    } catch (error) {
      if(error.response.status === 409){
        alert.error("Wprowadzone zostały złe daty.");
      }
      else if(error.response.status === 400){
        alert.error("Wydarzenie o podanym ID nie istnieje.");
    }
    else{
      alert.error("Serwer nie odpowiada.");
    }
  }
}

  export const fetchCurrentData = (blockName, alert) => async (dispatch) => {
      try{
        const response = await axios.get(API_URL + GetEventByBlockName + `${blockName}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        dispatch(setEvents(response.data));
      } catch(error){
        alert.error("Nie posiadasz już tego bloku. Ładuję wszystkie dane.");
        dispatch(setBlockNameInSlice("all"));
        localStorage.setItem("blockInfo", "Aktualnie ładujesz wszystkie swoje wydarzenia.")
        dispatch(fetchEvents(alert));
      }
  }

export default schedulerSlice.reducer;

