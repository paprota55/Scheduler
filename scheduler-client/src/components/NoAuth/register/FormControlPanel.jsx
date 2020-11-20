import React from "react";
import { useSelector } from "react-redux";
import { selectAll } from "../../../features/register/registerSlice";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./useStyles";
import { Grid, Button } from "@material-ui/core";

const FormControlPanel = ({ showSuccess }) => {
  const classes = useStyles();

  const { password, rePassword, didSubmit, success, response } = useSelector(selectAll);
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.buttonArea}
    >
      {didSubmit && password !== rePassword && (
        <Alert severity="error">Hasła nie są takie same.</Alert>
      )}
      {showSuccess && success && (
        <Alert severity="success">Konto zostało utworzone</Alert>
      )}
      {showSuccess && !success && response &&(
        <Alert severity="error">
          Konto o podanym loginie już istnieje.
        </Alert>
      )}
      {showSuccess && !success && !response &&(
        <Alert severity="error">
          Serwer nie odpowiada.
        </Alert>
      )}

      <Grid container spacing={4} direction="column" justify = "center" alignItems = "center">
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <a>
            <Button
              variant="contained"
              type="submit"
              width="100%"
            >
              Utwórz konto
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
              width="100%"
              href="/login"
            >
              Zaloguj
            </Button>
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FormControlPanel;
