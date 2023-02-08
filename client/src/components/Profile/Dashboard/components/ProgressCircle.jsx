import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../Utils/Theme/theme";
import io from "socket.io-client";
import Global from "../../../../Global";
const socket = io(Global.URL);
const ProgressCircle = ({ realProgress = 0.1, size = "40" }) => {
  // const [realProgress, setRealProgress] = useState(0.0);
  // const [reward, setReward] = useState(0.0);
  // useEffect(() => {
  //   if (realProgress === 0.0) {
  //     socket.emit("getDataSold");
  //   }
  //   socket.on("DataSold", (data) => {
  //     setRealProgress(data.promedio);
  //   });
  //   return () => {
  //     socket.off("DataSold", (data) => {
  //       setRealProgress(data.promedio);
  //     });
  //   };
  // }, [realProgress]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = realProgress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h9" fontWeight={800} letterSpacing={1.5}>
        {(parseFloat(realProgress) * 100).toFixed(2)}%
      </Typography>
    </Box>
  );
};

export default ProgressCircle;
