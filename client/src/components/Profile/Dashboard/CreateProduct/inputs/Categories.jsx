import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";

export default function Categories({ handleChange, categories }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          handleChange(e, "categories");
          handleChange(e, "categories");
        }
      }}
      onChange={(e) => {
        handleChange(e, "categories");
      }}
      options={categories}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component={"option"}
          {...props}
          value={option.name}
          key={option.id}
        >
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Categorias"
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
