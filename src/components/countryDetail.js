import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableContainer } from "@material-ui/core";
import Moment from "react-moment";
import Title from "./Title";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 250
  }
});

export default function CountryDetail(props) {
  const { detail } = { ...props };
  const classes = useStyles();
  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Cases</TableCell>
              <TableCell align="left">Deaths</TableCell>
              <TableCell align="left">Recovered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detail &&
              detail.timeline &&
              Object.keys(detail.timeline.cases)
                .reverse()
                .map((key, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell style={{width:150}}>
                        <Moment format="DD MMM YYYY">{key}</Moment>
                      </TableCell>
                      <TableCell style={{ fontSize: "large", color: "orange" }}>
                        {detail.timeline.cases[key]}
                      </TableCell>
                      <TableCell style={{ fontSize: "large", color: "red" }}>
                        {detail.timeline.deaths[key]}
                      </TableCell>
                      <TableCell style={{ fontSize: "large", color: "green" }}>
                        {detail.timeline.recovered[key]}
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
