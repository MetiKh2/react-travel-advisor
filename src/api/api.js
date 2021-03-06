import axios from "axios";


export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': '51d621d521msh11fbdb5aa35f597p1be397jsn37a8dc06a987'
            },
        });

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getWeatherData =async (lat ,lng) => {

    try {
        const {data}=await axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{
            params: {
                lat: lat,
                lon: lng,
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': '51d621d521msh11fbdb5aa35f597p1be397jsn37a8dc06a987'
            }
        });
        return data
    }
    catch (error){

    }
}