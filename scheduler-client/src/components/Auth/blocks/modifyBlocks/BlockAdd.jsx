import React from "react";
import { Paper, Button, Grid } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import { useAlert } from "react-alert";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import plLocale from "date-fns/locale/pl";

const BlockAdd = ({
  btnHandler,
  btnHandlerBack,
  dateFrom,
  dateTo,
  blockName,
  setDateFrom,
  setDateTo,
  setBlockName,
}) => {
  const alert = useAlert();

  function submit(event) {
    event.preventDefault();
    if (dateFrom && dateTo && blockName !== "" && dateFrom < dateTo) {
      btnHandler();
    } else {
      alert.error("Nie podałeś nazwy, bądź zła data");
    }
  }

  const handleBlockNameChange = (event) => {
    setBlockName(event.target.value);
  };

  return (
    <Paper style={{ width: "30%", height: "80%" }}>
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
              Dodaj nowy blok
            </p>
          </Grid>
          <Grid
            xs={12}
            item
            justify="center"
            alignContent="center"
            style={{ marginTop: "3vh", marginBottom: "3vh" }}
          >
            <TextValidator
              label="Nazwa bloku"
              style={{ width: "100%" }}
              onChange={handleBlockNameChange}
              value={blockName}
              name="blockName"
              type="text"
              validators={["required"]}
              errorMessages={["To pole jest wymagane."]}
            />
          </Grid>
          <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              helperText="Podaj prawidłowy format"
              format="dd-MM-yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data od"
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
              helperText="Podaj prawidłowy format"
              format="dd-MM-yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Data do"
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
                Dodaj
              </Button>
            </a>
            <a>
              <Button
                onClick={btnHandlerBack}
                variant="contained"
                color="primary"
              >
                Wróć
              </Button>
            </a>
          </Grid>
        </Grid>
      </ValidatorForm>
    </Paper>
  );
};

export default BlockAdd;
