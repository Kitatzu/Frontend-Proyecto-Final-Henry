import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Password = ({ name, label, inputRef }) => {
  const mode = useSelector((store) => store.theme.mode);
  const Theme = useSelector((store) => store.theme);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [pass, setPass] = useState("");

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  console.log(pass);

  return (
    <FormControl
      sx={{ m: 1, width: "100%", margin: "10px 0" }}
      variant="outlined"
    >
      <InputLabel
        htmlFor="outlined-adornment-password"
        sx={{ color: Theme[mode].textPrimary }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name={name}
        sx={{ color: Theme[mode].textPrimary }}
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
                  color={Theme[mode].textPrimary}
                />
              ) : (
                <Icon
                  icon="material-symbols:visibility"
                  color={Theme[mode].textPrimary}
                />
              )}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        onChange={handlePassChange}
        value={pass}
        ref={inputRef}
      />
    </FormControl>
  );
};
export default Password;
