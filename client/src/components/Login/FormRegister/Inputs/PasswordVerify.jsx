import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { React, useState } from "react";
import { useSelector } from "react-redux";
const PasswordVerifyInput = ({ handleChange, handleBlur, form, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  return (
    <FormControl
      sx={{ m: 1, width: "25ch" }}
      variant="outlined"
      className="Login-form-control"
    >
      <InputLabel
        htmlFor="outlined-adornment-password"
        style={{ color: Theme[mode].textPrimary }}
      >
        Verify Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        name="verifypassword"
        type={showPassword ? "text" : "password"}
        className="Login-input"
        onChange={handleChange}
        onBlur={handleBlur}
        value={form.verifypassword}
        style={{ color: Theme[mode].textPrimary }}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <Icon
                  icon="material-symbols:visibility-off"
                  style={{ color: Theme[mode].textPrimary }}
                />
              ) : (
                <Icon
                  icon="material-symbols:visibility"
                  style={{ color: Theme[mode].textPrimary }}
                />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Verify Password"
      />
    </FormControl>
  );
};
export default PasswordVerifyInput;
