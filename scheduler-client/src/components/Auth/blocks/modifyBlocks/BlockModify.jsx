import React from "react";
import { Paper, Button, Grid } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import plLocale from "date-fns/locale/pl";
import { blockPageMessages } from "../../../../languages/plLanguage";
import TextField from "@material-ui/core/TextField";
import { setBlockNameInSlice } from "../../../../features/scheduler/schedulerSlice";

const BlocksModify = ({
  btnHandler,
  block,
  btnHandlerBack,
  notes,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  setNotes,
  setBlockName
}) => {
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleAcceptChange = () => {
    setBlockName(block.blockName);
    btnHandler();
  }

  return (
    <Paper style={{ width: "30%", height: "50%" }}>
      <Grid
        container
        spacing={1}
        justify="center"
        alignContent="center"
        direction="column"
      >
        <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
          <p style={{ fontWeight: "bold", fontSize: "25px" }}>
            {blockPageMessages.actuallyModifiedLabel} {block.blockName}
          </p>
        </Grid>
        <Grid
          xs={12}
          item
          justify="center"
          alignContent="center"
          style={{ marginTop: "1vh", marginBottom: "1vh" }}
        >
          <TextField
            style={{ width: "50%" }}
            label={blockPageMessages.addBlockNotesLabel}
            onChange={handleNotesChange}
            value={notes}
            type="text"
          />
        </Grid>
        <Grid xs={12} item style={{ marginTop: "1vh", marginBottom: "1vh" }}>
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
              onChange={(date) => setDateFrom(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid xs={12} item style={{ marginTop: "1vh", marginBottom: "1vh" }}>
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
              onChange={(date) => setDateTo(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid container 
        spacing={1}
        justify="center"
        alignContent="center"
        direction="row">
          <Grid xs={6} item>
            <Button onClick={handleAcceptChange} variant="contained" color="secondary">
              {blockPageMessages.modifyButtonLabel}
            </Button>
          </Grid>
          <Grid xs={6} item>
            <Button
              onClick={btnHandlerBack}
              variant="contained"
              color="primary"
            >
              {blockPageMessages.cancelButtonLabel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BlocksModify;
