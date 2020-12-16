import React from "react";
import { Grid } from "@material-ui/core";
import { TextValidator } from "react-material-ui-form-validator";
import useStyles from "./useStyles";
import { registerPageMessages } from "../../../languages/plLanguage";

const UsersLogin = ({ email, login, handleEmailChange, handleLoginChange }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <TextValidator
        className={classes.textArea}
        onChange={handleLoginChange}
        value={login}
        type="login"
        name="login"
        label={registerPageMessages.loginLabel}
        validators={["required"]}
        errorMessages={[registerPageMessages.fieldIsRequiredLabel]}
      />
      <TextValidator
        className={classes.textArea}
        label={registerPageMessages.emailLabel}
        onChange={handleEmailChange}
        value={email}
        name="email"
        type="email"
        validators={["required", "isEmail"]}
        errorMessages={[
          registerPageMessages.fieldIsRequiredLabel,
          registerPageMessages.emailIsNotValidLabel,
        ]}
      />
    </Grid>
  );
};

export default UsersLogin;
