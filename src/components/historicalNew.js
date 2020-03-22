import React, { useRef, useState, useEffect } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSwr from "swr";
import { API } from "../config/config";
import useSupercluster from "use-supercluster";
import {
  Grid,
  Paper,
  makeStyles,
  Divider,
  Typography,
  Chip,
  CircularProgress
} from "@material-ui/core";
import CountryTimeline from "./CountryTimeline";
import CountryDetail from "./countryDetail";
import "./history.css";
import corona from "./corona.png";
import Title from "./Title";

const fetcher = (...args) => fetch(...args).then(response => response.json());

export default function HistoricalNew() {
  const [loading, setLoading] = useState(true);
  const [countryTotal, setCountryTotal] = useState(null);
  const [total, setTotal] = useState({
    cases: "",
    deaths: "",
    recovered: ""
  });
  const [historical, setHistorical] = useState([]);
  const [historicalData, setHistoricalData] = useState([null]);
  const [viewport, setViewport] = useState({
    latitude: 21,
    longitude: 78,
    width: "100%",
    height: "100%",
    zoom: 3
  });
  const url = API.map;
  const { data, error } = useSwr(url, { fetcher });
  const countries = data && !error ? data : [];
  const points = countries.map(country => ({
    type: "Feature",
    properties: {
      cluster: false,
      province: country.province,
      country: country.country,
      updatedAt: country.updatedAt,
      stats: country.stats
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(country.coordinates.longitude),
        parseFloat(country.coordinates.latitude)
      ]
    }
  }));
  const mapRef = useRef();
  useEffect(() => {
    if (loading) {
      fetch(API.historical)
        .then(response => response.json())
        .then(historical => {
          setHistorical(historical);
          setLoading(false);
        });

      fetch(API.total)
        .then(response => response.json())
        .then(data => {
          setTotal(data);
        });
    }
  }, [loading]);

  const markerClick = country => {
    console.log(country);
    console.log(historical);
    const filterResult = historical.filter(
      response =>
        response.country === country.country &&
        response.province === country.province
    );
    const filterCountry = countries.filter(
      response =>
        response.country === country.country &&
        response.province === country.province
    );
    setCountryTotal(filterCountry.length ? filterCountry[0] : null);
    setHistoricalData(filterResult.length ? filterResult[0] : null);
  };

  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <h1 style={{ fontSize: "30px", textAlign: "center", color: '#b51f1f' }}>
              <span>
                <img
                  src={corona}
                  alt=":( Go corona Go :("
                  style={{ width: "46px", marginBottom: '-11px' }}
                />
              </span>
              {historicalData && historicalData.country && (
                <span>
                  Corona Day By Day in {historicalData.country}{" "}
                  {historicalData.province || ""}
                </span>
              )}
              {!(historicalData && historicalData.country) && (
                <span>Corona All Over World</span>
              )}
            </h1>
            <Divider />
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} lg={4}>
                <span
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    fontSize: "30px"
                  }}
                >
                  {" "}
                  Cases:{" "}
                  {countryTotal && countryTotal.stats
                    ? countryTotal.stats.confirmed
                    : total.cases}
                </span>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "30px"
                  }}
                >
                  {" "}
                  Recovered:{" "}
                  {countryTotal && countryTotal.stats
                    ? countryTotal.stats.recovered
                    : total.recovered}
                </span>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <span
                  style={{ color: "red", fontWeight: "bold", fontSize: "30px" }}
                >
                  {" "}
                  Deaths:{" "}
                  {countryTotal && countryTotal.stats
                    ? countryTotal.stats.deaths
                    : total.deaths}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Divider />

          <Grid item xs={12} md={8} lg={8}>
            <ReactMapGL
              {...viewport}
              maxZoom={20}
              mapboxApiAccessToken="pk.eyJ1Ijoicml0dXJhanJhdGFuIiwiYSI6ImNrN3pyYjZzdTA0OXUzZW56azN0aDZ5b3gifQ.pxApFwi3KrDLgYPgsuOQ2g"
              onViewportChange={newViewport => {
                setViewport({ ...newViewport });
              }}
              ref={mapRef}
            >
              {clusters.map(cluster => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const {
                  cluster: isCluster,
                  point_count: pointCount
                } = cluster.properties;

                if (isCluster) {
                  return (
                    <Marker
                      key={`cluster-${cluster.id}`}
                      latitude={latitude}
                      longitude={longitude}
                    >
                      <div
                        className="cluster-marker"
                        style={{
                          width: `${10 + (pointCount / points.length) * 20}px`,
                          height: `${10 + (pointCount / points.length) * 20}px`
                        }}
                        onClick={() => {
                          const expansionZoom = Math.min(
                            supercluster.getClusterExpansionZoom(cluster.id),
                            20
                          );

                          setViewport({
                            ...viewport,
                            latitude,
                            longitude,
                            zoom: expansionZoom,
                            transitionInterpolator: new FlyToInterpolator({
                              speed: 2
                            }),
                            transitionDuration: "auto"
                          });
                        }}
                      >
                        {pointCount}
                      </div>
                    </Marker>
                  );
                }

                return (
                  <Marker
                    key={`crime-${latitude}`}
                    latitude={latitude}
                    longitude={longitude}
                  >
                    <button
                      className="crime-marker"
                      style={{ cursor: "pointer" }}
                      onClick={() => markerClick(cluster.properties)}
                    >
                      <img src={corona} alt=":( Go corona Go :(" />
                    </button>
                  </Marker>
                );
              })}
            </ReactMapGL>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper style={{ height: 300 }}>
              <CountryDetail detail={historicalData} />
            </Paper>
            <br />
            <Paper style={{ height: 300 }}>
              <CountryTimeline detail={historicalData} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}
