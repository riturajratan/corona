import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CountryDetail from "./countryDetail";
import CountryTimeline from "./CountryTimeline";



export default function countryStatus(props) {
  const useStyles = makeStyles(theme => ({
    fixedHeight: {
      height: 500
    }
  }));
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}><CountryDetail detail={props.detail.country}/></Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <CountryTimeline detail={props.detail.country} />
        </Paper>
      </Grid>
    </Grid>
  );
}
