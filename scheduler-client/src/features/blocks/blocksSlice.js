import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config";

const API_URL = serverIP;
const GetBlocks = "api/blocks/getBlocks";

const initialState = {
  blocks: [],
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setBlocks: (state, action) => {
      state.blocks = action.payload;
    },
  },
});

export const {
  setBlocks,
} = blocksSlice.actions;

export const selectBlocks = (state) => state.blocks.blocks;
export const selectAll = (state) => state.blocks;

export const fetchBlocks = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL + GetBlocks, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(setBlocks(response.data));
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlock = (blockName, alert) => async (dispatch) => {
  try {
    await axios.delete(API_URL + `api/blocks/deleteBlock/${blockName}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(fetchBlocks());
    alert.success("Operacja przebiegła pomyślnie.");
  } catch (error) {
    alert.error("Coś poszło źle.");
  }
};

export default blocksSlice.reducer;