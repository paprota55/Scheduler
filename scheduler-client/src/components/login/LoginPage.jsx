import React, { useState } from "react";
import {
  Container,
  ShadowContainer,
  ImageContainer,
} from "../../styles/styles.style";
import InputControl from "./InputControl";
import Submit from "./Submit";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectRedirectAddress,
  selectShouldRedirect,
} from "../../features/authentication/authSlice";
import { Redirect } from "react-router-dom";
const Error = ({ message }) => {
  // TODO: Make separate component when integrated with Api.
  return <div style={{ color: "red" }}> {message}</div>;
};

const LoginPage = () => {
  return (
    <ImageContainer img>
      <ShadowContainer shadow="0.4">
        <Container col height="100vh">
          <Login />
        </Container>
      </ShadowContainer>
    </ImageContainer>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  const redirectTo = useSelector(selectRedirectAddress);
  const shouldRedirect = useSelector(selectShouldRedirect);
  const dispatch = useDispatch();
  if (shouldRedirect === true) {
    return <Redirect to={redirectTo} />;
  } else {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const user = { login: username, password: password };
          dispatch(login(user));
        }}
      >
        <Container width="40vw" height="40vh" bgr="#A8A8A8" col round>
          <InputControl
            type="login"
            text = "Podaj login"
            value={username}
            handleChange={setUsername}
          >
            Login
          </InputControl>
          {validate && !username && (
            <Error message="Proszę podać swój login." />
          )}
          <InputControl
            type="password"
            text = "Podaj hasło"
            value={password}
            handleChange={setPassword}
          >
            Hasło
          </InputControl>
          {validate && !password && (
            <Error message="Proszę podać hasło." />
          )}
          <Submit>Zaloguj</Submit>
        </Container>
      </form>
    );
  }
};

export default LoginPage;