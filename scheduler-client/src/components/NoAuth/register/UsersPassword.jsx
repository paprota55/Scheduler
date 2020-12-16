import React from "react";
import { Grid } from "@material-ui/core";
import { TextValidator } from "react-material-ui-form-validator";
import useStyles from "./useStyles";
import { registerPageMessages } from "../../../languages/plLanguage";

const UsersPassword = ({
  password,
  rePassword,
  handlePasswordChange,
  handleRePasswordChange,
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <TextValidator
        className={classes.textArea}
        onChange={handlePasswordChange}
        value={password}
        label={registerPageMessages.passwordLabel}
        type="password"
        validators={[
          "required",
          "matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{8,}$",
        ]}
        errorMessages={[
          registerPageMessages.fieldIsRequiredLabel,
          registerPageMessages.passwordConditionsLabel,
        ]}
      />
      <TextValidator
        className={classes.textArea}
        onChange={handleRePasswordChange}
        value={rePassword}
        label={registerPageMessages.repeatPasswordLabel}
        type="password"
        validators={[
          "required",
          "matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{8,}$",
        ]}
        errorMessages={[
          registerPageMessages.fieldIsRequiredLabel,
          registerPageMessages.passwordConditionsLabel,
        ]}
      />
    </Grid>
  );
};

export default UsersPassword;
