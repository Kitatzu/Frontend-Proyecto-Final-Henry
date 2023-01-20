import { Card, Typography, CardContent, CardMedia, CardActionArea } from "@mui/material";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getProducts } from "../../Redux/Thunks/Producst";
//import { setProducts } from "../../Redux/Slices";

const Cards = ({ id, description, img, name, price, rating }) => {
    return(
        <div key={id}>
            <Card sx={{ maxWidth: 345, padding:"10px" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="110"
                        image={img}
                        alt="image"
                    />
                    <CardContent sx= {{ gap: "10px", display:"flex", flexDirection:"column" }}>
                        <Typography gutterBottom variant="h7" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        <Stack spacing={1}>
                            <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            ${price}
                        </Typography>
                     </CardContent>
                </CardActionArea>
             </Card> 

        </div>
    )
}

export default Cards