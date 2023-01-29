import {
  InputLabel,
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
const AgeInput = ({ handleChange, handleBlur, form, error }) => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  return (
    <FormControl
      sx={{ m: 1, width: "50%" }}
      variant="outlined"
      className="Login-form-control register-age"
    >
      
      <OutlinedInput
        id="outlined-adornment-lastname"
        name="birthday"
        inputProps={{min: 0}}
        type={"date"}
        onChange={handleChange}
        onBlur={handleBlur}
        value={form.age}
        className="Login-input"
        style={{ color: Theme[mode].textPrimary }}
        required
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end">
              <Icon
                icon="heroicons-solid:identification"
                style={{ color: Theme[mode].textPrimary }}
              />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
export default AgeInput;
