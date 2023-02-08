import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import bgDefault from "../../../assets/imgDefault.png";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductInCart,
  editCart,
} from "../../../../Redux/Thunks/getCart";
const Cards = ({ price, name, quantity, stock, image, productId, cartId }) => {
  image = image ? image : bgDefault;
  const Theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        width: { sx: "100%", sm: "400px" },
        background: Theme[mode].card,
        height: "200px",
        margin: "20px 0",
      }}
      variant="outlined"
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box width={"30%"}>
          <img style={{ width: "100%" }} src={image} alt="Product" />
        </Box>
        <Box width={"70%"} padding="10px">
          <Box>
            <Typography
              sx={{ color: Theme[mode].textPrimary }}
              fontWeight="bold"
            >
              {name}
            </Typography>
          </Box>
          <Box padding={"5px 0px"}>
            <Typography
              color="primary"
              component="span"
              fontSize={"12px"}
              sx={{ color: Theme[mode].textPrimary }}
            >
              4 Feb 2022
            </Typography>
          </Box>
          <Box
            sx={{ width: "100%" }}
            display="flex"
            justifyContent={"space-between"}
          >
            <Chip label={price + "$"} color="secondary" />
            <IconButton
              onClick={(e) => dispatch(deleteProductInCart(productId, cartId))}
            >
              <Icon icon="mdi:trash-can" color="#D3232F" />
            </IconButton>
          </Box>

          <Box display={"flex"} gap="20px" padding="5px 0">
            <Chip label="Cantidad" sx={{ color: Theme[mode].textPrimary }} />
            <Box width={"40px"}>
              <input
                type="number"
                min="1"
                max={stock}
                style={{ display: "inline-block", width: "100%" }}
                // InputProps={{
                //   inputProps: { min: 1, max: stock },
                //   style: { color: Theme[mode].textPrimary },
                // }}
                onChange={(e) => {
                  dispatch(editCart(productId, e.target.value));
                }}
                value={quantity}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default Cards;
