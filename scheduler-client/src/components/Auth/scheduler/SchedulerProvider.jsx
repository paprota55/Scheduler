import React, { useEffect } from "react";
import Scheduler from "./Scheduler";
import { useSelector, useDispatch } from "react-redux";
import { selectData, addEvent, deleteEvent  } from "../../../features/scheduler/schedulerSlice";
import { useAlert } from "react-alert";

const SchedulerProvider = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
      const data = useSelector(selectData);

      const deleteOldEvent = (event) => {
          dispatch(deleteEvent(event, alert));
        }

        const addNewEvent = (event) => {
          dispatch(addEvent(event, alert));
        }

  return (
    <div>
      <Scheduler events = {data} deleteEventt = {deleteOldEvent} addNewEventt = {addNewEvent}/>
    </div>
  );
};

export default SchedulerProvider;