import { useSelector } from "react-redux";
import { InputLabel, OutlinedInput, FormControl } from "@mui/material";

const PhoneUser = ({ phone }) => {
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
        Telefono
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-email"
        name="phoneUser"
        type={"phone"}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        defaultValue={phone}
        required
        label="Phone"
      />
    </FormControl>
  );
};

export default PhoneUser;
