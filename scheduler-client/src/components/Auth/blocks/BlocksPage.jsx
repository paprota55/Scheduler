import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBlocks,
  fetchBlocks,
} from "../../../features/blocks/blocksSlice";
import { Table } from "react-bootstrap";
import BlocksListing from "./BlocksListing";
import { Grid } from "@material-ui/core";

const BlocksPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlocks());
  }, []);
  const blocks = useSelector(selectBlocks);

  return (
    <Grid
      style={{ height: "100vh", width: "100vw" }}
      container
      direction="column"
      justify="top"
      alignItems="center"
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ marginTop: "3vh" }}>
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>
            Wszystkie twoje bloki
          </p>
        </div>
        <Table striped bordered hover size="sm" style={{ marginTop: "3vh" }}>
          <thead>
            <tr>
              <th>Lp</th>
              <th>Nazwa</th>
              <th>Data od</th>
              <th>Data do</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block, index) => (
              <BlocksListing info={block} index={index} />
            ))}
          </tbody>
        </Table>
      </div>
    </Grid>
  );
};
export default BlocksPage;
