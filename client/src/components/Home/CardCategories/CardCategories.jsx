import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { getProductsByCategories } from "../../../Redux/Thunks/Products";

function CardCategories({ value, key, id, img }) {
  const dispatch = useDispatch();
  return (
    <Button
      key={key}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
        background: "#282828",
        width: "300px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      onClick={() => dispatch(getProductsByCategories(value))}
    >
      <Box padding={"20px"}>
        <Typography sx={{ color: "white" }}>{value}</Typography>
      </Box>
      <Box width={"100px"}>
        <img style={{ width: "100%" }} src={img} alt={img} />
      </Box>
    </Button>
  );
}

export default CardCategories;
