import React from "react";
import { Grid } from "@material-ui/core";
import { TextValidator } from "react-material-ui-form-validator";
import useStyles from "./useStyles";

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
        label="Hasło"
        type="password"
        validators={[
          "required",
          "matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{8,}$",
        ]}
        errorMessages={[
          "To pole jest wymagane",
          " Hasło musi zawierać przynajmniej 8 znaków, dodatkowo: specjalny oraz duża litera.",
        ]}
      />
      <TextValidator
        className={classes.textArea}
        onChange={handleRePasswordChange}
        value={rePassword}
        label="Powtórz hasło"
        type="password"
        validators={[
          "required",
          "matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#.?!@$%^&*-]).{8,}$",
        ]}
        errorMessages={[
          "To pole jest wymagane",
          " Hasło musi zawierać przynajmniej 8 znaków, dodatkowo: specjalny oraz duża litera.",
        ]}
      />
    </Grid>
  );
};

export default UsersPassword;
