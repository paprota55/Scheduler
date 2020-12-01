import React, { useState } from 'react';
import { Paper, Button, Grid } from '@material-ui/core';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";


const BlocksModify = ({ btnHandler, block, btnHandlerBack, dateFrom, dateTo, setDateFrom, setDateTo }) => {

    return (
        <Paper style={{ width: "30%", height: "50%" }}>
        <Grid container spacing={1} justify="center" alignContent="center">
            <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
                <p style={{ fontWeight: "bold", fontSize: "25px" }}>Aktualnie modyfikujesz {block.blockName}</p>
            </Grid>
            <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
                <a>Data od: </a>
                <ReactDatePicker
                    selected={dateFrom}
                    onChange={date => setDateFrom(date)}
                    dateFormat ='yyyy-MM-dd'
                    disabledKeyboardNavigation
                    showWeekNumbers
                    locale={pl}
                />
            </Grid>
            <Grid xs={12} item style={{ marginTop: "3vh", marginBottom: "3vh" }}>
                <a>Data do: </a>
                <ReactDatePicker
                selected={dateTo}
                onChange={date => setDateTo(date)}
                dateFormat ='yyyy-MM-dd'
                disabledKeyboardNavigation
                showWeekNumbers
                locale={pl}
                />
            </Grid>
            <Grid xs={6} item>
                <Button onClick={btnHandler} variant="contained" color="secondary">Modyfikuj</Button>
            </Grid>
            <Grid xs={6} item>
                <Button onClick={btnHandlerBack} variant="contained" color="primary">Anuluj</Button>
            </Grid>
        </Grid>
    </Paper>
    );
};

export default BlocksModify;