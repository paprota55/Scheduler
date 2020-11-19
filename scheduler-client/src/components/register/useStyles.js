import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    minHeight: "60vh",

  },
  paper: {
    minWidth: "20vw",
    padding: "10px",
    backgroundColor: "white",
    borderRadius: "20px",
    minHeight: "60vh",
  },
  content: {
    marginTop: "8%",
    minWidth: "30vw",
    minHeight: "80%",
    textAlign: "center",
  },
  textArea: {
    marginTop: "1%",
    minWidth: "15vw",
    width: "25vw",
    color: "white",
  },
  buttonArea: {
    marginTop: "10%",
  },
  title: {
    fontSize: "10%",
    color: "white",
  },
}));

export default useStyles;
