import React, { useEffect } from "react";
import SchedulerHistory from "./SchedulerHistory";
import { useSelector, useDispatch } from "react-redux";
import { selectData, fetchEvents } from "../../../features/schedulerHistory/schedulerHistorySlice";
import { useAlert } from "react-alert";

const SchedulerHistoryProvider = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const data = useSelector(selectData);

        useEffect(() => {
          dispatch(fetchEvents(alert));
        }, [dispatch]);

  return (
    <div>
      <SchedulerHistory events = {data} />
    </div>
  );
};

export default SchedulerHistoryProvider;