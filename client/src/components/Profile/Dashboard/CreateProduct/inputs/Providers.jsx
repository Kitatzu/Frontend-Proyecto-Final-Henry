import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
const categories = [
  { id: "01", name: "gpu" },
  { id: "01", name: "gpu" },
  { id: "01", name: "gpu" },
  { id: "01", name: "gpu" },
  { id: "01", name: "gpu" },
];
export default function Providers() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
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
          label="Providers"
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
