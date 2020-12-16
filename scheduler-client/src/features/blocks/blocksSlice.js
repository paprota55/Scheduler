import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config";

const API_URL = serverIP;
const GetBlocks = "api/blocks/getBlocks";
const UpdateBlock = "api/blocks/modifyBlock";
const AddBlock ="api/blocks/addBlock";

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
    console.log(response.data);
    dispatch(setBlocks(response.data));
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
    alert.error("Serwer nie odpowiada.");
  }
};

export const updateBlock = (editBlock, alert) => async (dispatch) => {
  try {
    await axios.put(API_URL + UpdateBlock, editBlock, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(fetchBlocks());
    alert.success("Operacja przebiegła pomyślnie.");
  } catch (error) {
    if(error.response.status === 400)
    {
    alert.error("Problem z podanymi datami. Spróbuj ponownie.");
    }
    else{
      alert.error("Nie posiadasz bloku o podanej nazwie.");
    }
  }
};

export const addBlock = (addBlock, alert) => async (dispatch) => {
  try {
    await axios.post(API_URL + AddBlock, addBlock, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    alert.success("Blok został dodany");
    window.location.reload(false);
  } catch (error) {
    if(error.response.status === 409)
    {
    alert.error("Blok o podanej nazwie już istnieje");
    }
    else if (error.response.status === 409 ){
      alert.error("Podałeś nieprawidłowe daty");
    }
    else{
      alert.error("Serwer nie odpowiada.");
    }
  }
}

export default blocksSlice.reducer;
