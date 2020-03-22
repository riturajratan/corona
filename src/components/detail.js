import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Title from "./Title";
import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});
export default function Detail(props) {
  const { loading, detail } = { ...props };
  console.log(loading, detail);
  const classes = useStyles();

  return (
    <>
      {loading && <CircularProgress />}
      {detail && (
        <React.Fragment>
          <Title>Confirmed</Title>
          <Typography component="p" variant="h4">
            {detail.totalConfirmed.value}
          </Typography>
        </React.Fragment>
      )}
    </>
  );
}
