import { useSelector } from "react-redux";
import { InputLabel, OutlinedInput, FormControl } from "@mui/material";
import { useState } from "react";

const CityUser = ({ city }) => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);

  return (
    <FormControl
      sx={{ m: 1, width: "100%", margin: "8px 0" }}
      variant="outlined"
      className="Login-form-control"
    >
      <InputLabel
        htmlFor="outlined-adornment-email"
        style={{ color: Theme[mode].textPrimary }}
      >
        Ciudad
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        name="cityUser"
        type={"city"}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        defaultValue={city}
        required
        label="City"
      />
    </FormControl>
  );
};

export default CityUser;
