import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { Grid, Typography, Button } from "@material-ui/core";
import {
  setPassword,
  setNewPassword,
  updatePassword,
  selectAll,
  stopDisplayingResults,
} from "../../../features/userSettings/userPasswordSettingsSlice";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    height: "40vh",
  },
  title: { fontSize: "40px" },
  textField: {
    width: "60ch",
  },
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    password,
    newPassword,
    responseMessage,
    isResultOk,
    isSubmit,
    showResult,
  } = useSelector(selectAll);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updatePassword({ password, newPassword }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(stopDisplayingResults());
    }, 300);
    return () => {
      if (showResult === true) return clearTimeout(timer);
    };
  }, [isSubmit]);

  const showAlert = () => {
    if (isResultOk === true) {
      return <Alert severity="success">{responseMessage}</Alert>;
    } else {
      return <Alert severity="error">{responseMessage}</Alert>;
    }
  };

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <Grid
        className={classes.box}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography className={classes.title} variant="h1">
          Zmiana hasła
        </Typography>

        <TextValidator
          onChange={(event) => dispatch(setNewPassword(event.target.value))}
          value={newPassword}
          margin="normal"
          variant="outlined"
          className={classes.textField}
          label="Nowe hasło"
          type="password"
          validators={[
            "required",
            "matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{8,}$",
          ]}
          errorMessages={["To pole jest wymagane", "Hasło jest niepoprawne"]}
        />
        <TextValidator
          className={classes.textField}
          onChange={(event) => dispatch(setPassword(event.target.value))}
          value={password}
          margin="normal"
          variant="outlined"
          label="Aktualne hasło"
          type="password"
          validators={["required"]}
          errorMessages={["To pole jest wymagane"]}
        />
        <Button color="primary" variant="contained" type="submit">
          Zmień
        </Button>
        {showResult && showAlert()}
      </Grid>
    </ValidatorForm>
  );
};

export default ChangePassword;
