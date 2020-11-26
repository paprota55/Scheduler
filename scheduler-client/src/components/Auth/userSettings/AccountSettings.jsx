import React, { useState } from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import ChangeArchivingTime from "./ChangeArchivingTime";
import ChangeHeader from "./ChangeHeader";



const AccountSettings = () => {
  const [formId, setFormId] = useState(0);

  const getFormById = () => {
    switch (formId) {
      case 0:
        return <ChangeHeader />;
      case 1:
        return <ChangeEmail />;
      case 2:
        return <ChangePassword />;
      case 3:
        return <ChangeArchivingTime />;
      default:
        return <ChangeHeader />;
    }
  };

  return (
    <Grid
      style={{ height: "80vh", width: "100vw" }}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Paper style={{ padding: "8px", height: "50vh", width: "100vh" }}>
        <Paper style={{ padding: "4px" }}>
          <Grid container justify="space-around" alignItems="center">
            <Button onClick={() => setFormId(1)}>Zmień email</Button>
            <Button onClick={() => setFormId(2)}>Zmień hasło</Button>
            <Button onClick={() => setFormId(3)}>
              Zmień czas archiwizacji
            </Button>
          </Grid>
        </Paper>

        {getFormById()}
      </Paper>
    </Grid>
  );
};

export default AccountSettings;
