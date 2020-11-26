import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  selectNewTime,
  fetchArchiveTime,
} from "../../../features/userSettings/userHeaderSettingsSlice"
import { useSelector, useDispatch } from "react-redux";

const textToHeader = "Naciśnij odpowiedni przycisk na górze.";
const timeText = "Obecny czas archiwizacji: ";

const ChangeHeader = () => {  
  const dispatch = useDispatch();
  const newTime = useSelector(selectNewTime);


  useEffect(()=>{
    dispatch(fetchArchiveTime());
  },[])

  return (
  <Grid
    style={{ height: "40vh" }}
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
    <Typography style={{ textAlign: "center" }} variant="h4">
        <a>{textToHeader}</a><br/><br/>
        <a>{timeText}{newTime + " dni"}</a>
    </Typography>
  </Grid>
  );
};

export default ChangeHeader;