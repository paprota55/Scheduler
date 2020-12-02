import React from "react";
import { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import BlockDelete from "./BlockDelete";
import { Button } from "@material-ui/core";
import {
  deleteBlock,
  updateBlock,
} from "../../../../features/blocks/blocksSlice";
import BlockModify from "./BlockModify";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const BlocksListing = ({ info, index }) => {
  const alert = useAlert();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [blockName, setBlockName] = useState(info.blockName);

  const btnHandlerBack1 = () => {
    setOpen1(false);
  };

  const btnHandlerBack2 = () => {
    setOpen2(false);
  };

  const handleDelete = () => {
    dispatch(deleteBlock(info.blockName, alert));
    setOpen2(false);
    handleReset();
  };

  const handleReset = () => {
    setDateFrom(null);
    setDateTo(null);
    setBlockName(null);
  };

  const handleModify = () => {
    setDateTo(dateTo);
    setDateFrom(dateFrom);
    dispatch(updateBlock({ blockName, dateFrom, dateTo }, alert));
    setOpen1(false);
    handleReset();
  };

  const handleToggle1 = () => {
    setOpen1(!open1);
  };

  const handleToggle2 = () => {
    setOpen2(!open2);
  };

  const handleToggle3 = () => {
    alert.error("Dodaj ładowanie danych ...");
  };

  return (
    <>
      <tr style={{ width: "100%" }}>
        <td style={{ width: "3%" }}>{index + 1}</td>
        <td className={classes.row}>{info.blockName}</td>
        <td className={classes.row}>{info.dateFrom}</td>
        <td className={classes.row}>{info.dateTo} </td>
        <td>
          <Button variant="outlined" color="primary" onClick={handleToggle3}>
            Załaduj
          </Button>
        </td>
        <td>
          <Button variant="outlined" color="primary" onClick={handleToggle1}>
            Zmień
          </Button>
        </td>
        <td>
          <Button variant="outlined" color="primary" onClick={handleToggle2}>
            Usuń
          </Button>
        </td>
      </tr>

      <Backdrop className={classes.backdrop} open={open1}>
        <BlockModify
          btnHandler={handleModify}
          block={info}
          btnHandlerBack={btnHandlerBack1}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={open2}>
        <BlockDelete
          btnHandler={handleDelete}
          block={info}
          btnHandlerBack={btnHandlerBack2}
        />
      </Backdrop>
    </>
  );
};
export default BlocksListing;
