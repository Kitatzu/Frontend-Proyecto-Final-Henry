import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";

export default function Brands({ handleChange, brands }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          handleChange(e, "brand");
          handleChange(e, "brand");
        }
      }}
      onChange={(e) => {
        handleChange(e, "brand");
      }}
      options={brands}
      getOptionLabel={(option) => option.brand}
      renderOption={(props, option) => (
        <Box
          component={"option"}
          {...props}
          value={option.brand}
          key={option.id}
        >
          {option.brand}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Marca"
          //   style={{ color: Theme[mode].textPrimary }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
            // style: { color: Theme[mode].textPrimary }, // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
