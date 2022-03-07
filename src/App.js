import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import {CssBaseline,Grid} from '@material-ui/core'
import {useEffect, useState} from "react";
import {getPlacesData, getWeatherData} from "./api/api";
function App() {
    const [places,setPlaces]=useState([])
    const [weather,setWeather]=useState([])
    const [loading,setLoading]=useState(false)
    const [coordinate,setCoordinate]=useState([35.78489207392822,51.49982911846682])
    const [type,setType]=useState('restaurants')
    const [rate,setRate]=useState(0)
    const [filteredPlaces,setFilteredPlaces]=useState([])
    const [bounds,setBounds]=useState({ne:
            {
                lat: 35.82852393197491,
                lng: 51.54717053305592
        }, sw: {
            lat: 35.71766068983185,
            lng: 51.469751252050074
        }})
    useEffect(()=>{
       if (bounds.sw&&bounds.ne){
           setLoading(true)
           getWeatherData(coordinate[0],coordinate[1])
               .then(data=>{
                   setWeather(data)
               })
           getPlacesData(type,bounds.sw,bounds.ne)
               .then((data)=>{
                   setPlaces(data.filter((place)=>place.name&&place.num_reviews>0))
                   setFilteredPlaces([])
                   setLoading(false);
               })
       }
    },[bounds,type])
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
        })
    },[])

    useEffect(()=>{
        if(places) {
            const filteredPlaces = places.filter((places) => places.rating > rate)
            setFilteredPlaces(filteredPlaces)
        }
    },[rate])
  return (
    <>
     <CssBaseline>
        <Header setCoordinate={setCoordinate}/>
         <Grid container spacing={3} style={{width:'100%'}}>
             <Grid item xs={12} md={4}>
                 <List
                     type={type}
                     setType={setType}
                     rate={rate}
                     setRate={setRate}
                     loading={loading}
                     places={filteredPlaces.length?filteredPlaces:places} />
             </Grid>
             <Grid item xs={12} md={8}>
                 <Map
                     weather={weather}
                     places={filteredPlaces.length?filteredPlaces:places}
                     coordinate={coordinate} setCoordinates={setCoordinate}
                     setBounds={setBounds}/>
             </Grid>
         </Grid>
     </CssBaseline>
    </>
  );
}

export default App;
