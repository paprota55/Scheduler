import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: "10px",
      },
      textField: {
        backgroundColor: "#white",
      },
      title: {
        fontSize: "2rem",
        color: "black",
      },
      buttonStyle: {
        alignSelf: "center",
      },
      buttonContainer: {
        alignSelf: "stretch",
      },
}));

export default useStyles;
