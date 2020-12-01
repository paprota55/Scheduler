import React from 'react';
import { Paper, Button, Grid } from '@material-ui/core';


const BlocksDelete = ({ btnHandler, block, btnHandlerBack }) => {
    return (
        <Paper style={{ width: "30%", height: "30%" }}>
            <Grid container spacing={1} justify="center" alignContent="center">
                <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
                    <p style={{ fontWeight: "bold", fontSize: "25px" }}>Czy na pewno chcesz usunąc {block.blockName}?</p>
                </Grid>
                <Grid xs={6} item>
                    <Button onClick={btnHandler} variant="contained" color="secondary">Tak</Button>
                </Grid>
                <Grid xs={6} item>
                    <Button onClick={btnHandlerBack} variant="contained" color="primary">Nie</Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BlocksDelete;