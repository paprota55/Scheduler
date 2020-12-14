import React from "react";
import { Grid } from "@material-ui/core";
import { TextValidator } from "react-material-ui-form-validator";
import useStyles from "./useStyles";

const UsersLogin = ({
  email,
  login,
  handleEmailChange,
  handleLoginChange,
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <TextValidator
        className={classes.textArea}
        onChange={handleLoginChange}
        value={login}
        type="login"
        name="login"
        label="Login"
        validators={["required"]}
        errorMessages={["To pole jest wymagane"]}
      />
        <TextValidator
        className={classes.textArea}
        label="Email"
        onChange={handleEmailChange}
        value={email}
        name="email"
        type="email"
        validators={["required", "isEmail"]}
        errorMessages={["To pole jest wymagane", "email jest nieprawidłowy"]}
      />
    </Grid>
  );
};

export default UsersLogin;
