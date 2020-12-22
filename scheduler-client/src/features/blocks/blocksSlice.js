import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import serverIP from "../../config";

const API_URL = serverIP;
const GetBlocks = "api/blocks/getBlocks";
const GetSchedulerBlocksList = "api/blocks/getBlocksToScheduler";
const UpdateBlock = "api/blocks/modifyBlock";
const AddBlock ="api/blocks/addBlock";
const DeleteBlock = "api/blocks/deleteBlock/";

const initialState = {
  blocks: [],
  schedulerBlocksList: [],
};

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setBlocks: (state, action) => {
      state.blocks = action.payload;
    },
    setSchedulerBlocksList: (state, action) => {
      state.schedulerBlocksList = action.payload;
    },
  },
});

export const {
  setBlocks,
  setSchedulerBlocksList,
} = blocksSlice.actions;

export const selectBlocks = (state) => state.blocks.blocks;
export const selectSchedulerBlocksList = (state) => state.blocks.schedulerBlocksList;
export const selectAll = (state) => state.blocks;

export const fetchSchedulerBlocksList = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL + GetSchedulerBlocksList, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(setSchedulerBlocksList(response.data));
  } catch (error) {
  }
};

export const fetchBlocks = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL + GetBlocks, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(setBlocks(response.data));
  } catch (error) {
  }
};

export const deleteBlock = (blockName, alert) => async (dispatch) => {
  try {
    await axios.delete(API_URL + DeleteBlock + `${blockName}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    dispatch(fetchBlocks());
    dispatch(fetchSchedulerBlocksList());
    if(localStorage.getItem(""))
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
    dispatch(fetchSchedulerBlocksList());
    alert.success("Operacja przebiegła pomyślnie.");
  } catch (error) {
    if(error.response.status === 400)
    {
    alert.error("Data końca występuje przed datą początku.");
    }
    else if(error.response.status === 406)
    {
    alert.error("Podane daty bloku nachodzą na inny.");
    }
    else if(error.response.status === 409)
    {
    alert.error("Nie możemy znaleźć bloku o podanej nazwie.");
    }
    else if(error.response.status === 404)
    {
    alert.error("Nie została wprowadzona jedna z dat.");
    }
    else{
      alert.error("Serwer nie odpowiada.");
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
    else if (error.response.status === 406 ){
      alert.error("Podane daty nachodzą na istniejący blok");
    }
    else if (error.response.status === 400 ){
      alert.error("Podałeś nieprawidłowe daty");
    }
    else{
      alert.error("Serwer nie odpowiada.");
    }
  }
}

export default blocksSlice.reducer;
