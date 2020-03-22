import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { API } from "../config/config";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (loading) {
      fetch(API.countries)
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
          <Title>Corona Status</Title>
          <MaterialTable
            title="Corona Status"
            columns={[
              { title: "Country", field: "country" },
              { title: "Cases", field: "cases" },
              { title: "TodayCases", field: "todayCases" },
              { title: "Deaths", field: "deaths",  cellStyle: {
                color: 'red'
              }, },
              { title: "Recovered", field: "recovered" , cellStyle: {
                color: 'green'
              },},
              { title: "Active", field: "active" },
              { title: "Critical", field: "critical", cellStyle: {
                color: 'orange'
              }, },
              // { title: "CasesPerOneMillion", field: "casesPerOneMillion" }
            ]}
            data={detail}
            pageSize={10}
            options={{
              rowsPerPage: 10,
              search: true,
              headerStyle: {
                backgroundColor: '#3f51b5',
                color: '#FFF'
              }
            }}
          ></MaterialTable>
        </React.Fragment>
      )}
    </>
  );
}
