import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { Grid, Typography, Button } from "@material-ui/core";
import {
  setPassword,
  setNewEmail,
  updateEmail,
  selectAll,
  stopDisplayingResults,
} from "../../../features/userSettings/userEmailSettingsSlice";
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

const ChangeEmail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    password,
    newEmail,
    responseMessage,
    isResultOk,
    isSubmit,
    showResult,
  } = useSelector(selectAll);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateEmail({ password, newEmail }));
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
          {userSettingsPageMessages.changeEmailHeaderLabel}
        </Typography>
        <TextValidator
          onChange={(event) => dispatch(setNewEmail(event.target.value))}
          value={newEmail}
          margin="normal"
          variant="outlined"
          className={classes.textField}
          label={userSettingsPageMessages.newEmailLabel}
          type="email"
          validators={["required", "isEmail"]}
          errorMessages={[
            userSettingsPageMessages.fieldIsRequiredLabel,
            userSettingsPageMessages.emailIsNotValid,
          ]}
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

export default ChangeEmail;
