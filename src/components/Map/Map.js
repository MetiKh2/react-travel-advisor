import React from 'react';
import {Paper,Typography,useMediaQuery} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating'
import useStyles from "./styles";
import {Marker, Popup, TileLayer, MapContainer, useMapEvent, useMapEvents} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import DefaultMarker from "./DefaultMarker";
const Map = ({setBounds,setCoordinates,coordinate,places,weather}) => {
    const classes=useStyles()
    const isDesktop=useMediaQuery('(min-width:600px)')
    return (
        <div className={`${classes.mapContainer} leaflet-container`} style={{overflow:"hidden"}}>
            <MapContainer

                center={coordinate}
                zoom={13}
                style={{height:'100%',width:'100%'}}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
               <MarkerClusterGroup>
                   {places.map(item=> {
                       if(item.latitude&&item.longitude){
                           if(!isDesktop){
                               return <Marker  position={[Number(item?.latitude),Number(item?.longitude)]} icon={DefaultMarker} />
                           }
                           else{
                               return <Marker  position={[Number(item?.latitude),Number(item?.longitude)]} icon={DefaultMarker} >
                                   <Popup >
                                       <Paper elevation={3} className={classes.paper} >
                                           <Typography
                                               className={classes.typography}
                                               variant={"subtitle1"}>
                                               {item.name}
                                           </Typography>
                                           <img className={classes.pointer}
                                                alt={item.name}
                                                src={item.photo?item.photo.images.large.url: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}/>
                                           <Rating name="read-only" size="small" value={Number(item.rating)} readOnly />
                                       </Paper>
                                   </Popup>
                               </Marker>
                           }
                       }
                   })}
                   {weather.list?.map((data)=>{
                       return <Marker position={[Number(data.coord.lat),Number(data.coord.lon)]} icon={DefaultMarker}></Marker>
                   })}
               </MarkerClusterGroup>

                <LocationMarker places={places} coordinate={coordinate} setCoordinates={setCoordinates} setBounds={setBounds}/>

            </MapContainer>
        </div>
    );
};

export default Map;

function LocationMarker({coordinate, setBounds,setCoordinates,places}) {
    const classes=useStyles()
    const isMobile=useMediaQuery('(min-width:600px)')
    const map = useMapEvents({
        click(e) {
            const bounds=e.target.getBounds()
            setCoordinates([e.latlng.lat,e.latlng.lng])
            setBounds({ne: {...bounds._northEast},sw: {...bounds._southWest}})
            map.locate()
        },
        locationfound(e) {
        },
    })

    return coordinate === null ? null : (
       null
    )
}

