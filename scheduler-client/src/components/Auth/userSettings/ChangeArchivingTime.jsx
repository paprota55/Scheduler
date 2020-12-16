import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { Grid, Typography, Button } from "@material-ui/core";
import {
  setPassword,
  setNewTime,
  updateArchiveTime,
  selectAll,
  stopDisplayingResults,
} from "../../../features/userSettings/userArchiveSettingsSlice";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { userSettingsPageMessages } from "../../../languages/plLanguage"

const useStyles = makeStyles({
  box: {
    height: "40vh",
  },
  title: { fontSize: "40px" },
  textField: {
    width: "60ch",
  },
});

const ChangeArchiveTime = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    password,
    newTime,
    responseMessage,
    isResultOk,
    isSubmit,
    showResult,
  } = useSelector(selectAll);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateArchiveTime({ password, newTime }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(stopDisplayingResults());
    }, 3000);
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
          <a>{userSettingsPageMessages.timeChangeDescribeLabel}</a>
        </Typography>
        <TextValidator
          onChange={(event) => dispatch(setNewTime(event.target.value))}
          value={newTime}
          margin="normal"
          variant="outlined"
          className={classes.textField}
          label={userSettingsPageMessages.numbersOfDayPlaceHolder}
          type="number"
          validators={["required", "matchRegexp:^[0-9]{1,3}$"]}
          errorMessages={[userSettingsPageMessages.fieldIsRequiredLabel, userSettingsPageMessages.numbersOfDaysErrorMessage]}
        />
        <TextValidator
          className={classes.textField}
          onChange={(event) => dispatch(setPassword(event.target.value))}
          value={password}
          margin="normal"
          variant="outlined"
          label={userSettingsPageMessages.actualPasswordLabel}
          type="password"
          validators={["required"]}
          errorMessages={[userSettingsPageMessages.fieldIsRequiredLabel]}
        />

        <Button color="primary" variant="contained" type="submit">
          {userSettingsPageMessages.changeButtonLabel}
        </Button>
        {showResult && showAlert()}
      </Grid>
    </ValidatorForm>
  );
};

export default ChangeArchiveTime;
