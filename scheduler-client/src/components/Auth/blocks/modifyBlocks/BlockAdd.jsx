import React, { useState } from "react";
import { Paper, Button, Grid } from "@material-ui/core";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { addBlock } from "../../../../features/blocks/blocksSlice";

const BlockAdd = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [blockName, setBlockName] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  function submit(event) {
    event.preventDefault();
    let block = {
        blockName : blockName,
        dateFrom : dateFrom,
        dateTo : dateTo,
    };
    console.log(blockName);
    console.log(dateFrom);
    console.log(dateTo);

    if (dateFrom && dateTo && blockName != "" && dateFrom < dateTo) {
        dispatch(addBlock(block,alert));
    } else {
      alert.error("Nie podałeś nazwy, bądź zła data");
    }
  }

  const handleBlockNameChange = (event) => {
    setBlockName(event.target.value);
  };

  return (
    <Paper style={{ width: "100%", height: "80vh" }}>
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
            <a>Data od: </a>
            <ReactDatePicker
              selected={dateFrom}
              onChange={(date) => setDateFrom(date)}
              dateFormat="yyyy-MM-dd"
              disabledKeyboardNavigation
              showWeekNumbers
              locale={pl}
            />
          </Grid>
          <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
            <a>Data do: </a>
            <ReactDatePicker
              selected={dateTo}
              onChange={(date) => setDateTo(date)}
              dateFormat="yyyy-MM-dd"
              disabledKeyboardNavigation
              showWeekNumbers
              locale={pl}
            />
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
          </Grid>
        </Grid>
      </ValidatorForm>
    </Paper>
  );
};

export default BlockAdd;
