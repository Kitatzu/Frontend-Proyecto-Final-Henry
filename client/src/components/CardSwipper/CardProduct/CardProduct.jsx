import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import imgDefault from "../../assets/imgDefault.png";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const CradProduct = ({ key, id, img, name, price, rating }) => {
  img = img ? img : imgDefault;
  return (
    <Link
      to={{ pathname: `/products/${id}` }}
      target="_parent"
      rel="noopener noreferer"
    >
      <div key={key}>
        <Card
          sx={{
            width: "175px",
            padding: "20px",
            background: "rgba(255,255,255,.2)",
            borderTop: "2px solid rgba(255,255,255,.4)",
            borderLeft: "2px solid rgba(255,255,255,.4)",
            borderRight: "1px solid rgba(255,255,255,.2)",
            borderBottom: "1px solid rgba(255,255,255,.2)",
            backdropFilter: "blur(20px)",
            height: "245px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            width={"100%"}
            display="flex"
            justifyContent={"center"}
            padding="5px"
            alignItems={"center"}
            height="max-content"
          >
            <CardMedia
              component="img"
              sx={{ width: "100%" }}
              image={img}
              alt="image"
            />
          </Box>
          <CardActionArea>
            <CardContent
              sx={{ gap: "5px", display: "flex", flexDirection: "column" }}
            >
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {name.toUpperCase()}
              </Typography>
              {/* <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: theme[mode].textPrimary }}
              >
                {description}
              </Typography> */}
              <Stack spacing={1}>
                <Rating
                  name="half-rating-read"
                  defaultValue={rating}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: "white" }}
              >
                ${price}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Link>
  );
};

export default CradProduct;
