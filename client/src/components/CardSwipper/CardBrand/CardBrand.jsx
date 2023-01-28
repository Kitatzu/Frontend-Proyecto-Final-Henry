import { Box } from "@mui/material";
import React from "react";
import amdImage from "../../assets/amd-default-social-image-1200x628.webp";
import intelImage from "../../assets/Intel-nuevo-logo-2-1200x900.png";
import nvidiaImage from "../../assets/02-nvidia-logo-color-blk-500x200-4c25-p@2x.png";
function CardBrand() {
  return (
    <>
      <Box
        sx={{
          filter:
            "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
          width: { xs: "200px", sm: "200" },
          height: { xs: "150px", sm: "150px" },
          minWidth: { xs: "150px", sm: "240px" },
          borderRadius: "20px",
          background: `url(${intelImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
      <Box
        sx={{
          filter:
            "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
          width: { xs: "200px", sm: "200" },
          height: { xs: "150px", sm: "150px" },
          minWidth: { xs: "150px", sm: "240px" },
          borderRadius: "20px",
          background: `url(${amdImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      <Box
        sx={{
          filter:
            "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
          width: { xs: "200px", sm: "200" },
          height: { xs: "150px", sm: "150px" },
          minWidth: { xs: "150px", sm: "240px" },
          borderRadius: "20px",
          background: `url(${nvidiaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
    </>
  );
}

export default CardBrand;
