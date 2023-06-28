export const weatherService = {
    getWeather,
}

const API_KEY = '0cacfaecd8ce2baa63d434978d889723'



function getWeather(place){
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lng}&APPID=${API_KEY}&units=metric`
console.log('place.lat:', place.lat)
console.log('place.lng:', place.lng)
    return fetch(url).then(res=>{
      console.log('res.data:', res)  
      return {
        temp: res.main.temp,
        desc: res.weather[0].description
      }
    })

}