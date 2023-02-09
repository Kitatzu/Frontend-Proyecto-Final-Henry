import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Box } from "@mui/system";

export default function Providers({ handleChange, providers }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          handleChange(e, "providers");
          handleChange(e, "providers");
        }
      }}
      onChange={(e) => {
        handleChange(e, "providers");
      }}
      options={providers}
      getOptionLabel={(option) => option.provider}
      renderOption={(props, option) => (
        <Box
          component={"option"}
          {...props}
          value={option.provider}
          key={option.id}
        >
          {option.provider}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Provedor"
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
