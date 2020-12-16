import React, { useState } from "react";
import { Container } from "../../../styles/styles.style";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  InputAdornment,
  Paper,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { login, selectAll } from "../../../features/authentication/authSlice";
import { Redirect } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import useStyles from "./useStyles";
import {
  loginPageMessages
} from "../../../languages/plLanguage";

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { redirectTo, shouldRedirect, failed, errorMessage } = useSelector(
    selectAll
  );

  const dispatch = useDispatch();

  const handlesubmit = (event) => {
    event.preventDefault();
    const user = { login: username, password: password };
    dispatch(login(user));
  };

  if (shouldRedirect === true) {
    return <Redirect to={redirectTo} />;
  } else {
    return (
      <form onSubmit={handlesubmit}>
        <Grid>
          <Container width="40vw" height="60vh" bgr="white" col round>
            <Typography className={classes.title}>{loginPageMessages.loginTitle}</Typography>
            <Paper className={classes.paper}>
              <TextField
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                variant="outlined"
                error={failed}
                className={classes.textField}
                placeholder={loginPageMessages.loginPlaceHolder}
                label={failed ? errorMessage : loginPageMessages.loginPlaceHolder}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
            <Paper className={classes.paper}>
              <TextField
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                variant="outlined"
                error={failed}
                className={classes.textField}
                placeholder={loginPageMessages.passwordPlaceHolder}
                label={failed ? errorMessage : loginPageMessages.passwordPlaceHolder}
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
            <Grid container spacing={2} direction="column" justify = "center" alignItems = "center">
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <a className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.buttonStyle}
                  >
                    {loginPageMessages.loginButtonLabel}
                  </Button>
                </a>
              </Grid>
              <Grid
                item
                xs={6}
                justify="center"
                alignItems="center"
                style={{ textAlign: "center" }}
              >
                <a>
                  <Button
                    variant="contained"
                    type="button"
                    href="/register"
                    className={classes.buttonStyle}
                  >
                    {loginPageMessages.registerButtonLabel}
                  </Button>
                </a>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </form>
    );
  }
};

export default Login;
