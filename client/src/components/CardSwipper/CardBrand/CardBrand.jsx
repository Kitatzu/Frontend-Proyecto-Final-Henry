import { Box, Button } from "@mui/material";
import React from "react";
import imgDefault from "../../assets/imgDefault.png";

function CardBrand({ img, brand, key }) {
  img = img ? img : imgDefault;
  return (
    <Button
      sx={{
        filter:
          "drop-shadow(0px 100px 130px rgba(0, 0, 0, 0.08)) drop-shadow(0px 41.7776px 54.3109px rgba(0, 0, 0, 0.0575083)) drop-shadow(0px 22.3363px 29.0372px rgba(0, 0, 0, 0.0476886)) drop-shadow(0px 12.5216px 16.278px rgba(0, 0, 0, 0.04)) drop-shadow(0px 6.6501px 8.64513px rgba(0, 0, 0, 0.0323114)) drop-shadow(0px 2.76726px 3.59743px rgba(0, 0, 0, 0.0224916))",
        width: "240px",
        height: "150px",
        minWidth: "240px",
        borderRadius: "20px",
        background: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "inline-block",
      }}
      className="cardBrand"
    ></Button>
  );
}

export default CardBrand;
