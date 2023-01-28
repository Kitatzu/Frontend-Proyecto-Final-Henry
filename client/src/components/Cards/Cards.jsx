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

const Cards = ({ key, id, description, img, name, price, rating }) => {
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
          sx={{ width: 210, padding: "10px", background: theme[mode].card }}
        >
          <CardActionArea>
            <CardMedia component="img" height="110" image={img} alt="image" />
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

export default Cards;
