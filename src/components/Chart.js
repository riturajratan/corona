import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Title from "./Title";
import { API } from "../config/config";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";

export default function Chart() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    if (loading) {
      fetch(API.dailySummary)
        .then(response => response.json())
        .then(data => {
          data.map(d => d.reportDateString = moment(d.reportDateString).format('DD-MMM-YYYY'));
          setDetail(data);
          setLoading(false);
        });
    }
  }, [loading]);
  return (
    <>
      {loading && <CircularProgress />}
      {detail && (
        <React.Fragment>
          <Title>Corona Journey Day By Day</Title>
          <ResponsiveContainer>
            <AreaChart
              data={detail}
              margin={{
                top: 16,
                right: 16,
                bottom: 35,
                left: 24
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="reportDateString" angle={-43} textAnchor="end" tick={{ fontSize: 10 }} tickCount={20}/>
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="deaths.total"
                stackId="1"
                stroke="#f44336"
                fill="#f44336"

              />
              <Area
                type="monotone"
                dataKey="recovered.total"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
               <Area
                type="monotone"
                dataKey="totalConfirmed"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </React.Fragment>
      )}
    </>
  );
}
