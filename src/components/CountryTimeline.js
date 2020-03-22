import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 400
  }
});
export default function CountryTimeline(props) {
  const { detail } = { ...props };
  const classes = useStyles();
  let data = [];
  console.log(detail);
  if (detail && detail.timeline) {
    Object.keys(detail.timeline.cases).forEach(key => {
      data.push({
        date: moment(key).format('DD-MMM-YY'),
        cases: +detail.timeline.cases[key],
        deaths: +detail.timeline.deaths[key],
        recovered: +detail.timeline.recovered[key]
      });
    });
  }
  console.log(data);
  return (
    <>
      {data.length && (
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 35,
              left: 24
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" tickSize={1} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="deaths"
              stackId="1"
              stroke="#f44336"
              fill="#f44336"
            />
            <Line
              type="monotone"
              dataKey="recovered"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Line
              type="monotone"
              dataKey="cases"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
