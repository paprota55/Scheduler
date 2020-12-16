import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  selectNewTime,
  fetchArchiveTime,
} from "../../../features/userSettings/userHeaderSettingsSlice"
import { useSelector, useDispatch } from "react-redux";
import { userSettingsPageMessages } from "../../../languages/plLanguage"

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
        <a>{userSettingsPageMessages.textToHeaderLabel}</a><br/><br/>
        <a>{userSettingsPageMessages.timeTextLabel}{newTime + " dni"}</a>
    </Typography>
  </Grid>
  );
};

export default ChangeHeader;