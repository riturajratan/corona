import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import { API } from "../config/config";
import Moment from "react-moment";
import {
  Grid,
  Paper,
  makeStyles,
  Divider,
  Typography
} from "@material-ui/core";
import CountryTimeline from "./CountryTimeline";
import clsx from "clsx";
import CountryDetail from "./countryDetail";

const Map = ReactMapboxGl({
  includeGeometry: true,
  accessToken:
    "pk.eyJ1Ijoicml0dXJhanJhdGFuIiwiYSI6ImNrN3pyYjZzdTA0OXUzZW56azN0aDZ5b3gifQ.pxApFwi3KrDLgYPgsuOQ2g"
});

const mapStyle = {
  // flex: 1,
  height: "80vh",
  width: "50vw"
};

export default class Historical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      center: [78, 21],
      zoom: [3],
      country: undefined,
      historical: undefined,
      selectedHistorical: undefined
    };
    fetch(API.map)
      .then(response => response.json())
      .then(countries => {
        this.setState({ countries: countries.splice(1) });
      });

    fetch(API.historical)
      .then(response => response.json())
      .then(historical => {
        this.setState({ historical });
      });
  }
  onToggleHover = (cursor, { map }) => {
    map.getCanvas().style.cursor = cursor;
  };

  markerClick = (feature, { country }) => {
    console.log(feature, country);
    this.setState({
      center: [+feature.coordinates.longitude, +feature.coordinates.latitude],
      zoom: [6],
      country: feature
    });
    console.log(feature);
    const filterResult = this.state.historical.filter(
      data =>
        data.country === feature.country && data.province === feature.province
    );
    console.log(filterResult);
    this.setState({
      selectedHistorical: filterResult.length ? filterResult[0] : null
    });
    console.log(this.state);
  };
  // componentDidMount() {}

  render() {
    const { countries, country, center, zoom, selectedHistorical } = this.state;
    return (
      this.state.countries.length && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={8}>
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={mapStyle}
              center={center}
              zoom={zoom}
            >
              <Layer
                type="circle"
                circ
                id="marker"
                paint={{
                  "circle-color": "red",
                  "circle-radius": 9,
                  "circle-stroke-width": 2,
                  "circle-stroke-color": "#fff"
                }}
                // layout={{ "icon-image": "marker-15" }}
              >
                {countries.map((country, index) => {
                  return (
                    <Feature
                      key={index}
                      coordinates={[
                        +country.coordinates.longitude,
                        +country.coordinates.latitude
                      ]}
                      onMouseEnter={this.onToggleHover.bind(this, "pointer")}
                      onMouseLeave={this.onToggleHover.bind(this, "")}
                      onClick={this.markerClick.bind(this, country)}
                    >
                      {" "}
                      7{" "}
                    </Feature>
                  );
                })}
              </Layer>
              {country && (
                <Popup
                  key={country.country}
                  coordinates={[
                    +country.coordinates.longitude,
                    +country.coordinates.latitude
                  ]}
                >
                  <div
                    style={{
                      background: "white",
                      color: "#3f618c",
                      fontWeight: "400",
                      padding: "5px",
                      borderRadius: "2px"
                    }}
                  >
                    <Typography
                      component="h2"
                      color="primary"
                      variant="h5"
                      style={{ fontWeight: "bold"}}
                    >
                      {country.country} {country.province || ""}
                    </Typography>
                    <Typography
                      component="p"
                      style={{ color: "orange"}}
                      variant="h6"
                    >
                      Confirmed: {country.stats.confirmed}
                    </Typography>
                    <Typography
                      component="p"
                      style={{ color: "green"}}
                      variant="h6"
                    >
                      Recovered: {country.stats.recovered}
                    </Typography>
                    <Typography
                      component="p"
                      color="error"
                      variant="h6"
                    >
                      Deaths: {country.stats.deaths}
                    </Typography>
                    <Typography
                      component="p"
                      variant="p"
                    >
                        Updated on{" "}
                        <Moment format="DD/MMM/YYYY">
                          {country.updatedAt}
                        </Moment>
                      </Typography>
                  </div>
                </Popup>
              )}
            </Map>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper style={{ height: 300 }}>
              <CountryDetail detail={selectedHistorical} />
            </Paper>
            <br />
            <Paper style={{ height: 300 }}>
              <CountryTimeline detail={selectedHistorical} />
            </Paper>
          </Grid>
        </Grid>
      )
    );
  }
}
