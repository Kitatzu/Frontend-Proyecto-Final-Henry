import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
const categories = [
  { id: "01", name: "gpu" },
  { id: "02", name: "gpu" },
  { id: "03", name: "gpu" },
  { id: "04", name: "gpu" },
  { id: "05", name: "gpu" },
];
export default function Categories({ handleChange }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e) => {
        handleChange(e, "categories");
      }}
      options={categories}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component={"li"} {...props} value={option.name} key={option.id}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Categories"
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
