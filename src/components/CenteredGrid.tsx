import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { WarehouseInput } from './WarehouseInput';
import { Paper } from '@material-ui/core';
import { WarehouseOutput} from './WarehouseOutput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
  }),
);

export default function CenteredGrid() {
  const classes = useStyles();
  const [warehouseLogs, setWarehouseLogs] = useState("");

  return (
    <div className={classes.root}>
      <Grid container>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <WarehouseInput warehouseLogs={warehouseLogs} setWarehouseLogs={setWarehouseLogs} ></WarehouseInput>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <WarehouseOutput logsData={warehouseLogs}></WarehouseOutput>
                </Paper>
            </Grid>
      </Grid>
    </div>
  );
}