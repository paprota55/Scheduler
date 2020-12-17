import { fetchSchedulerBlocksList } from "../../../features/blocks/blocksSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const InstructionPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSchedulerBlocksList());
  }, [dispatch]);
  
    return (
      <h1>Instrukcja</h1>
    );
  }
  
  export default InstructionPage;