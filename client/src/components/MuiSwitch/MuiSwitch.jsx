import { Switch } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../Redux/Slices/theme";
import MaterialUISwitch from "./MaterialUiSwitch/MaterialUiSwitch";

export default function MuiSwitch() {
  const dispatch = useDispatch();
  const mode = useSelector((store) => store.theme.mode);

  const handleChange = (event) => {
    dispatch(setMode(event.target.checked ? "dark" : "light"));
  };
  return <MaterialUISwitch onChange={handleChange} checked={mode === "dark"} />;
}
