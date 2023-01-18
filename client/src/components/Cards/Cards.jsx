import { Grid, Card, Typography, CardContent, CardMedia, CardActionArea } from "@mui/material";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { DummyInfo } from ".";

const Cards = () => {
    return(
        <div>
            <Grid container spacing={3}>
                { DummyInfo?.map((el, id) => {
                    return(
                        <Grid item xs={1} key={id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={el.img}
                                        alt="image"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {el.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {el.description}
                                        </Typography>
                                        <Stack spacing={1}>
                                            <Rating name="half-rating-read" defaultValue={el.rating} precision={0.5} readOnly />
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary">
                                            ${el.price}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card> 
                        </Grid>
                    )
                })} 
            </Grid>
        </div>
    )
}

export default Cards