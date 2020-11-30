import React from "react";
import { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import BlockDelete from "./BlocksDelete";
import { Button } from "@material-ui/core";
import { deleteBlock } from "../../../features/blocks/blocksSlice";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  row: {
    textAlign: "center",
    verticalAlign: "middle",
  },
}));

const BlocksListing = ({ info, index }) => {
  const alert = useAlert();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const btnHandlerBack = () => {
    console.log(info.blockName);
    setOpen(false);
  };

  const handleClose = () => {
    dispatch(deleteBlock(info.blockName, alert));
    console.log(info.blockName);
    setOpen(false);
    window.location.reload(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <tr style={{ width: "100%" }} onClick={handleToggle}>
        <td style={{ width: "3%" }}>{index + 1}</td>
        <td className={classes.row}>{info.blockName}</td>
        <td className={classes.row}>{info.dateFrom}</td>
        <td className={classes.row}>{info.dateTo} </td>
      </tr>

      <Backdrop className={classes.backdrop} open={open}>
        <BlockDelete
          btnHandler={handleClose}
          block={info}
          btnHandlerBack={btnHandlerBack}
        />
      </Backdrop>
    </>
  );
};
export default BlocksListing;
