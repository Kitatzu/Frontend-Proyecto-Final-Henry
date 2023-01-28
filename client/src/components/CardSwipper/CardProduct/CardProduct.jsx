import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

import imgDefault from "../../assets/imgDefault.png";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const CradProduct = ({ key, id, img, name, price, rating }) => {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
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
            width: 210,
            padding: "10px",
            background: "rgba(255,255,255,.2)",
            borderTop: "2px solid rgba(255,255,255,.4)",
            borderLeft: "2px solid rgba(255,255,255,.4)",
            borderRight: "1px solid rgba(255,255,255,.2)",
            borderBottom: "1px solid rgba(255,255,255,.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          <CardActionArea>
            <Box width={"100%"} padding="20px">
              <CardMedia
                component="img"
                width={"100%"}
                image={img}
                alt="image"
              />
            </Box>
            <CardContent
              sx={{ gap: "10px", display: "flex", flexDirection: "column" }}
            >
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ color: theme[mode].textPrimary, fontWeight: "bold" }}
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
                sx={{ color: theme[mode].textPrimary }}
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
