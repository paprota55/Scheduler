import React, { useEffect } from "react";
import { Paper, Button, Grid } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import plLocale from "date-fns/locale/pl";
import {blockPageMessages} from "../../../../languages/plLanguage"

const BlocksModify = ({
  btnHandler,
  block,
  btnHandlerBack,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
}) => {

    

  return (
    <Paper style={{ width: "30%", height: "50%" }}>
      <Grid container spacing={1} justify="center" alignContent="center">
        <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
          <p style={{ fontWeight: "bold", fontSize: "25px" }}>
            {blockPageMessages.actuallyModifiedLabel} {block.blockName}
          </p>
        </Grid>
        <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              helperText={blockPageMessages.helperDateLabel}
              format="dd-MM-yyyy"
              margin="normal"
              id="date-picker-inline"
              label={blockPageMessages.dateStartLabel}
              value={dateFrom}
              onChange={date => setDateFrom(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              helperText={blockPageMessages.helperDateLabel}
              format="dd-MM-yyyy"
              margin="normal"
              id="date-picker-inline"
              label={blockPageMessages.dateEndLabel}
              value={dateTo}
              onChange={date => setDateTo(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid xs={6} item>
          <Button onClick={btnHandler} variant="contained" color="secondary">
            {blockPageMessages.modifyButtonLabel}
          </Button>
        </Grid>
        <Grid xs={6} item>
          <Button onClick={btnHandlerBack} variant="contained" color="primary">
            {blockPageMessages.cancelButtonLabel}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlocksModify;
