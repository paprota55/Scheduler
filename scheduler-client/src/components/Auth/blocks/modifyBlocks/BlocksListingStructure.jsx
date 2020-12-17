import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBlocks,
  fetchBlocks,
} from "../../../../features/blocks/blocksSlice";
import { Table } from "react-bootstrap";
import BlocksListing from "./BlocksListing";
import { Grid } from "@material-ui/core";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import BlockAdd from "./BlockAdd";
import { addBlock } from "../../../../features/blocks/blocksSlice";
import { fetchEvents, setBlockNameInSlice } from "../../../../features/scheduler/schedulerSlice";
import { blockPageMessages } from "../../../../languages/plLanguage";
import { fetchSchedulerBlocksList } from "../../../../features/blocks/blocksSlice";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const BlocksListingStructure = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [blockName, setBlockName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(fetchSchedulerBlocksList());
  }, [dispatch]);

  const btnHandlerBack = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const loadData = () => {
    dispatch(setBlockNameInSlice("all"));
    localStorage.setItem("blockInfo", "Aktualnie ładujesz wszystkie swoje wydarzenia.")
    dispatch(fetchEvents(alert));
  };

  const handleBlockAdded = () => {
    setOpen(false);
    let block = {
      blockName: blockName,
      dateFrom: dateFrom,
      dateTo: dateTo,
      notes: notes,
    };
    dispatch(addBlock(block, alert));
  };

  useEffect(() => {
    dispatch(fetchBlocks());
  }, [dispatch]);
  const blocks = useSelector(selectBlocks);

  return (
    <Grid
      style={{ height: "80vh", width: "100vw", padding: "0" }}
      container
      direction="column"
      justify="top"
      alignItems="center"
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ marginTop: "3vh" }}>
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>{blockPageMessages.yourBlocksLabel}</p>
        </div>
        <Table striped bordered hover size="sm" style={{ marginTop: "3vh" }}>
          <thead>
            <tr>
              <th>{blockPageMessages.tableHeaderFirst}</th>
              <th>{blockPageMessages.tableHeaderName}</th>
              <th>{blockPageMessages.tableHeaderNotes}</th>
              <th>{blockPageMessages.tableHeaderStartDate}</th>
              <th>{blockPageMessages.tableHeaderEndDate}</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block, index) => (
              <BlocksListing key={index} info={block} index={index} />
            ))}
          </tbody>
        </Table>
        <Button variant="outlined" color="secondary" onClick={handleToggle}>
          {blockPageMessages.addButtonLabel}
        </Button>
        <Button variant="outlined" color="primary" onClick={loadData}>
          {blockPageMessages.loadAllButtonLabel}
        </Button>
      </div>
      <Backdrop className={classes.backdrop} open={open}>
        <BlockAdd
          btnHandler={handleBlockAdded}
          btnHandlerBack={btnHandlerBack}
          blockName={blockName}
          notes = {notes}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setBlockName={setBlockName}
          setNotes = {setNotes}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      </Backdrop>
    </Grid>
  );
};
export default BlocksListingStructure;
