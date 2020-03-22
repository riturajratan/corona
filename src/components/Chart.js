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

export default function Chart() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    if (loading) {
      fetch(API.dailySummary)
        .then(response => response.json())
        .then(data => {
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
          <Title>Corona Journey</Title>
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
              <XAxis dataKey="reportDateString"  angle={-45} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="deltaConfirmed"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
              <Area
                type="monotone"
                dataKey="totalRecovered"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
               <Area
                type="monotone"
                dataKey="totalConfirmed"
                stackId="1"
                stroke="#f44336"
                fill="#f44336"
              />
            </AreaChart>
          </ResponsiveContainer>
        </React.Fragment>
      )}
    </>
  );
}
