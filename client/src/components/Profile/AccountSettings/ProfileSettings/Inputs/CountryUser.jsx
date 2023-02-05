import { useSelector } from "react-redux";
import { InputLabel, OutlinedInput, FormControl } from "@mui/material";

const CountryUser = ({ country }) => {
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
        name="countryUser"
        type={"country"}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        defaultValue={country}
        required
        label="Country"
      />
    </FormControl>
  );
};

export default CountryUser;