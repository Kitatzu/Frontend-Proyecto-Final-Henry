import { Button } from "@mui/material";
import React, { useState } from "react";
import imgDefault from "../../assets/imgDefault.png";
import "./CardBrand.css";

function CardBrand({ img, key }) {
  const [className, setClassName] = useState("cardBrand");
  img = img ? img : imgDefault;
  return (
    <Button
      key={key}
      sx={{
        width: "240px",
        height: "150px",
        minWidth: "240px",
        borderRadius: "20px",
        background: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "inline-block",
      }}
      onClick={() => {
        if (className === "cardBrand") {
          setClassName("cardBrandActive");
        }
      }}
      onBlur={() => {
        if (className === "cardBrandActive") {
          setClassName("cardBrand");
        }
      }}
      className={className}
    ></Button>
  );
}

export default CardBrand;
