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
import imgDefault from "../assets/imgDefault.png";
import { Link } from "react-router-dom";

const Cards = ({ key, id, img, name, price, rating }) => {
  const mode = useSelector((store) => store.theme.mode);
  const theme = useSelector((store) => store.theme);
  img = img ? img : imgDefault;

  return (
    <Link to={`/products/${id}`}>
      <div key={key}>
        <Card
          sx={{
            width: "200px",
            padding: "20px",
            background: theme[mode].card,
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "20px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", maxHeight: "120px" }}
            image={img}
            alt="image"
          />
          <CardActionArea>
            <CardContent
              sx={{ gap: "10px", display: "flex", flexDirection: "column" }}
            >
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{
                  color: theme[mode].textPrimary,
                  fontWeight: "bold",
                  width: "100%",
                  overflow: "hidden",
                }}
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

export default Cards;
