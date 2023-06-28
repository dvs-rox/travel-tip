

const API_KEY = '0cacfaecd8ce2baa63d434978d889723'



function getWeather(place){
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lng}&APPID=${API_KEY}`

    return axios.get(url).then(res=>res.data)

}