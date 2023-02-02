import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import "./Bubles.css";
export default function Bubles({ size, top, right, delay }) {
  const { buttonPrimary } = useSelector((store) => store.theme.dark);
  return (
    <Box
      width={size}
      height={size}
      borderRadius="50%"
      className="buble"
      position={"absolute"}
      top={top}
      right={right}
      sx={{ background: buttonPrimary, animationDelay: delay }}
    ></Box>
  );
}
