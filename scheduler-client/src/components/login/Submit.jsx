import React from "react";
import { Container, Button } from "../../styles/styles.style";
const Submit = ({ children }) => {
  return (
    <Container width="100%" margin="1%">
      <Button width="30%" bgr = "#FFFFFF" text="black" round>
        {children}
      </Button>
    </Container>
  );
};

export default Submit;
