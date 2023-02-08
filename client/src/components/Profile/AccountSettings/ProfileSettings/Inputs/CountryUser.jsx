import { useSelector } from "react-redux";
import { InputLabel, OutlinedInput, FormControl } from "@mui/material";

const CountryUser = ({ country, handleChange, handleBlur, error }) => {
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
        Pais
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        name="country"
        type={"country"}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        defaultValue={country}
        required
        label="Country"
      />
    </FormControl>
  );
};

export default CountryUser;
