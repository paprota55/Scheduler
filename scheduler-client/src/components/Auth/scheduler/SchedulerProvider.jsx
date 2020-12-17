import React, { useEffect } from "react";
import Scheduler from "./Scheduler";
import { useSelector, useDispatch } from "react-redux";
import { selectData, addEvent, deleteEvent, changeEvent, selectBlockName, fetchCurrentData  } from "../../../features/scheduler/schedulerSlice";
import { useAlert } from "react-alert";
import { Grid } from "@material-ui/core";
import { selectSchedulerBlocksList, fetchSchedulerBlocksList } from "../../../features/blocks/blocksSlice";

const SchedulerProvider = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const blockName = useSelector(selectBlockName);
      const data = useSelector(selectData);
      const blocksList = useSelector(selectSchedulerBlocksList);

      const deleteOldEvent = (event) => {
          dispatch(deleteEvent(event,blockName, alert));
        }

        const addNewEvent = (event) => {
          console.log(event);
          dispatch(addEvent(event, blockName, alert));
        }

        const changeOldEvent = (event) => {
          dispatch(changeEvent(event,blockName, alert));
        }

        useEffect(() => {
          dispatch(fetchSchedulerBlocksList());
        }, [dispatch]);

        useEffect(() => {
          dispatch(fetchCurrentData(blockName, alert));
        }, [dispatch]);

  return (
    <div style={{height: "100%"}}>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center">
      <a style={{height: "2vh", fontWeight: 700}}>
        {localStorage.getItem('blockInfo')}
      </a>
      </Grid>
      <Scheduler events = {data} blocksList = {blocksList} deleteEventt = {deleteOldEvent} addNewEventt = {addNewEvent} changeOldEvent = {changeOldEvent}/>
    </div>
  );
};

export default SchedulerProvider;