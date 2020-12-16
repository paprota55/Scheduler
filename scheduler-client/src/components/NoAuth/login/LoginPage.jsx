import React from "react";
import {
  Container,
  ShadowContainer,
  ImageContainer,
} from "../../../styles/styles.style";
import Login from "./Login";
import {
  loginPageMessages
} from "../../../languages/plLanguage";

const LoginPage = () => {
  return (
    <ImageContainer img>
      <ShadowContainer shadow="0.4">
        <Container col height="100vh">
          <Container row height="100vh" width="100vw">
            <a
              style={{
                color: "white",
                fontSize: "27px",
                textAlign: "center",
                lineHeight: "45px",
                width: "45vw",
              }}
            >
              {loginPageMessages.leftSideTextLabel}
            </a>
            <Login />
          </Container>
        </Container>
      </ShadowContainer>
    </ImageContainer>
  );
};

export default LoginPage;
