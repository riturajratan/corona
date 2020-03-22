import React, { useState, useEffect } from "react";
// import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import { API } from "../config/config";
import Moment from "react-moment";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function Deposits() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (loading) {
      fetch(API.total)
        .then(response => response.json())
        .then(data => {
          setDetail(data);
          setLoading(false);
        });
    }
  }, [loading]);
  const classes = useStyles();
  return (
    <>
      {loading && <CircularProgress />}
      {detail && (
        <React.Fragment>
          <Typography variant="h4" style={{color: "orange"}} component="h4">
            Confirmed
          </Typography>
          <Typography component="h3" style={{color: "orange", fontWeight:"bold"}} variant="h2">
            {detail.cases}
          </Typography>
          <hr/>
          <Typography variant="h4" style={{color: "green"}} component="h4">
            Recovered
          </Typography>
          <Typography component="p" style={{color: "green", fontWeight:"bold"}} variant="h2">
            {detail.recovered}
          </Typography>
          <hr/>
          <Typography variant="h4" color="error"  component="h4">
            Deaths
          </Typography>
          <Typography component="p"  color="error"  style={{fontWeight:"bold"}}  variant="h2">
            {detail.deaths}
          </Typography>
          <hr/>
          <Typography color="textSecondary" variant="h6"  className={classes.depositContext}>
            Till <Moment format="DD-MMM-YYYY">{detail.updated}</Moment> 
          </Typography>
          <div></div>
        </React.Fragment>
      )}
    </>
  );
}
