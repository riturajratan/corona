import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { API } from "../config/config";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Location() {
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    if (loading) {
      fetch(API.historical)
        .then(response => response.json())
        .then(data => {
          setDetail(data);
          setLoading(false);
        });
    }
  }, [loading]);
  const [state, setState] = React.useState({
    age: "",
    name: "hai"
  });

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Locations</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange("age")}
          inputProps={{
            name: "age",
            id: "age-native-simple"
          }}
        >
          {detail &&
            detail.map((data, index) => {
              return index && <option value={index}>{data.country} {data.province || ''}</option>;
            })}
        </Select>
      </FormControl>
    </div>
  );
}
