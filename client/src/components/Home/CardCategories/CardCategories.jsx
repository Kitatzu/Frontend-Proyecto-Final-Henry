import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function CardCategories({ value, key, id, img }) {
  return (
    <Button
      key={key}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
        background: "#282828",
        width: "300px",
      }}
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
