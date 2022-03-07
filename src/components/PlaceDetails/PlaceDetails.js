import React from 'react';
import useStyles from "./styles";
import {Typography,Box,Button,Card,CardMedia,CardActions,Chip,CardContent} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from "@material-ui/lab/Rating";
const PlaceDetails = ({place}) => {
    const classes=useStyles()
    return (
        <Card elevation={6}>
            <CardMedia style={{height:350}}
            image={place.photo?place.photo.images.large.url: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
            title={place.name}/>
            <CardContent>
                <Typography gutterBottom variant={'h5'}>{place.name}</Typography>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant={"subtitle1"}>Price</Typography>
                <Typography variant={"subtitle1"}>{place.price_level}</Typography>
            </Box>
                <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant={"subtitle1"}>Ranking</Typography>
                <Typography variant={"subtitle1"}>{place.ranking}</Typography>
            </Box>
                {
                    place?.awards?.map((award)=>{
                        <Box my={1} display={'flex'} justifyContent={'space-between'}>
                            <img src={award.images.small} alt={award.display_name}/>
                            <Typography variant={"subtitle2"} color={'textSecondary'}>{award.display_name}</Typography>
                        </Box>
                    })
                }
                {
                    place?.cuisine?.map(({name})=>{
                        <Chip key={name} size={'small'} label={name} classes={classes.chip}/>
                    })
                }
                {
                    place?.address&&(
                        <Typography className={classes.subtitle} gutterBottom variant={"body2"} color={"textSecondary"}>
                            <LocationOnIcon></LocationOnIcon> {place.address}
                        </Typography>
                    )
                }
                {
                    place?.phone&&(
                        <Typography className={classes.subtitle} gutterBottom variant={"body2"} color={"textSecondary"}>
                            <PhoneIcon></PhoneIcon> {place.phone}
                        </Typography>
                    )
                }
                <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                <CardActions>
                    <Button size={"small"} color={"primary"} onClick={()=>window.open(place.web_url,"_blank")}>
                        Trip Advisor
                    </Button>
                    <Button size={"small"} color={"primary"} onClick={()=>window.open(place.website,"_blank")}>
                    Web Site
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default PlaceDetails;