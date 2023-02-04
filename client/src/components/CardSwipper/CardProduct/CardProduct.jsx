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
import { useSelector } from "react-redux";

const CradProduct = ({ key, id, img, name, price, rating, origin }) => {
  img = img ? img : imgDefault;
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  return (
    <Link to={`/products/${id}`}>
      <div key={key}>
        <Card
          sx={{
            width: "175px",
            padding: "20px",
            background:
              origin === "banner" ? "rgba(255,255,255,.2)" : theme[mode].card,
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
              sx={{ width: "100%", maxHeight: "74px" }}
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
                sx={{
                  color:
                    origin === "banner" ? "white" : theme[mode].textPrimary,
                  fontWeight: "bold",
                }}
              >
                {name.toUpperCase()}
              </Typography>

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
                sx={{
                  color:
                    origin === "banner" ? "white" : theme[mode].textPrimary,
                }}
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
