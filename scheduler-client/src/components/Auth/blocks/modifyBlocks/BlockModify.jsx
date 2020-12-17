import React from "react";
import { Paper, Button, Grid } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import { useAlert } from "react-alert";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import plLocale from "date-fns/locale/pl";
import { blockPageMessages } from "../../../../languages/plLanguage";

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
  const alert = useAlert();

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  function submit(event) {
    event.preventDefault();
    if (dateFrom && dateTo && dateFrom < dateTo) {
      setBlockName(block.blockName);
      btnHandler();
    } 
    else {
      alert.error("Podałeś złe daty.");
    }
  }

  return (
  <Paper style={{ width: "30%", height: "70%" }}>
  <ValidatorForm onSubmit={submit}>
    <Grid
      container
      spacing={1}
      justify="center"
      alignContent="center"
      direction="column"
    >
      <Grid
        xs={12}
        item
        style={{
          marginTop: "3vh",
          marginBottom: "3vh",
          textAlign: "center",
        }}
      >
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
        <TextValidator
          label={blockPageMessages.addBlockNotesLabel}
          style={{ width: "70%" }}
          onChange={handleNotesChange}
          value={notes}
          name="notes"
          type="text"
        />
      </Grid>
      <Grid xs={12} item  style={{ marginTop: "1vh", marginBottom: "1vh" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
        <KeyboardDatePicker
          disableToolbar
          style={{ width: "70%" }}
          variant="inline"
          helperText={blockPageMessages.addBlockDateHelper}
          format="dd-MM-yyyy"
          margin="normal"
          id="date-picker-inline"
          label={blockPageMessages.addBlockStartDateLabel}
          value={dateFrom}
          onChange={date => setDateFrom(date)}
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
          style={{ width: "70%" }}
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
      <Grid
        xs={12}
        item
        justify="center"
        alignContent="center"
        direction="row"
        style={{ textAlign: "center" }}
      >
        <a>
          <Button type="submit" variant="contained" color="secondary">
            {blockPageMessages.modifyButtonLabel}
          </Button>
        </a>
        <a>
          <Button
            onClick={btnHandlerBack}
            variant="contained"
            color="primary"
          >
            {blockPageMessages.cancelButtonLabel}
          </Button>
        </a>
      </Grid>
    </Grid>
  </ValidatorForm>
</Paper>
);
};

export default BlocksModify;
