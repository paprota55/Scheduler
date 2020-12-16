import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, Paper } from "@material-ui/core";
import {
  Container,
  ShadowContainer,
  ImageContainer,
} from "../../../styles/styles.style";
import {
  emailChange,
  loginChange,
  passwordChange,
  rePasswordChange,
  toggleDidSubmit,
  selectAll,
  register,
  toggleSuccess,
} from "../../../features/register/registerSlice";
import useStyles from "./useStyles";
import { ValidatorForm } from "react-material-ui-form-validator";
import FormControlPanel from "./FormControlPanel";
import UsersLogin from "./UsersLogin";
import UsersPassword from "./UsersPassword";
import { registerPageMessages } from "../../../languages/plLanguage";

const RegisterPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showSuccess, toggleShowSuccess] = useState(false);
  const user = useSelector(selectAll);
  const { email, login, password, rePassword } = user;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(toggleSuccess(false));
      toggleShowSuccess(false);
    }, 5000);
    return () => {
      if (showSuccess === true) return clearTimeout(timer);
    };
  }, [showSuccess]);

  const handleEmailChange = (event) =>
    dispatch(emailChange(event.target.value));
  const handleLoginChange = (event) =>
    dispatch(loginChange(event.target.value));
  const handlePasswordChange = (event) =>
    dispatch(passwordChange(event.target.value));
  const handleRePasswordChange = (event) =>
    dispatch(rePasswordChange(event.target.value));

  function toggleSubmit(toggleValue) {
    dispatch(toggleDidSubmit(toggleValue));
  }

  function submit(event) {
    event.preventDefault();
    let user = {
      login: login,
      email: email,
      password: password,
    };
    if (password === rePassword && email && login && password && rePassword) {
      dispatch(register(user));
      toggleSubmit(true);
      toggleShowSuccess(true);
    } else {
      toggleSubmit(true);
      toggleShowSuccess(false);
    }
  }

  return (
    <ImageContainer img>
      <ShadowContainer shadow="0.4">
        <Container col height="100vh">
          <Grid container justify="center" alignItems="center">
            <ValidatorForm onSubmit={submit}>
              <Grid
                className={classes.root}
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ height: "80vh" }}
              >
                <Paper elevation={6} className={classes.paper}>
                  <Grid className={classes.content}>
                    <Typography className={classes.title}>
                      {registerPageMessages.registerTitle}
                    </Typography>
                    <UsersLogin
                      email={email}
                      login={login}
                      handleEmailChange={handleEmailChange}
                      handleLoginChange={handleLoginChange}
                    />
                    <UsersPassword
                      password={password}
                      rePassword={rePassword}
                      handlePasswordChange={handlePasswordChange}
                      handleRePasswordChange={handleRePasswordChange}
                    />
                    <FormControlPanel showSuccess={showSuccess} />
                  </Grid>
                </Paper>
              </Grid>
            </ValidatorForm>
          </Grid>
        </Container>
      </ShadowContainer>
    </ImageContainer>
  );
};

export default RegisterPage;
