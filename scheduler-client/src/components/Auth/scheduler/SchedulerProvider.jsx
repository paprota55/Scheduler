import React, { useEffect } from "react";
import Scheduler from "./Scheduler";
import { useSelector, useDispatch } from "react-redux";
import { selectData, addEvent, deleteEvent, changeEvent, selectBlockName, fetchCurrentData  } from "../../../features/scheduler/schedulerSlice";
import { useAlert } from "react-alert";

const SchedulerProvider = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const blockName = useSelector(selectBlockName);
      const data = useSelector(selectData);

      const deleteOldEvent = (event) => {
          dispatch(deleteEvent(event,blockName, alert));
        }

        const addNewEvent = (event) => {
          dispatch(addEvent(event, blockName, alert));
        }

        const changeOldEvent = (event) => {
          console.log(event);
          dispatch(changeEvent(event,blockName, alert));
        }

        useEffect(() => {
          dispatch(fetchCurrentData(blockName, alert));
        }, [dispatch]);

  return (
    <div>
      <Scheduler events = {data} deleteEventt = {deleteOldEvent} addNewEventt = {addNewEvent} changeOldEvent = {changeOldEvent}/>
    </div>
  );
};

export default SchedulerProvider;