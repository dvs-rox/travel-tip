export const weatherService = {
    getWeather,
}

const API_KEY = '0cacfaecd8ce2baa63d434978d889723'



function getWeather(place,lat,lng){
    const url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}&units=metric`
console.log('place.lat:', lat)
console.log('place.lng:', lng)
console.log('place:', place)
    return fetch(url).then(res=>res.json()).then(res=>{
      console.log('res:', res)  
    //   return {
    //     temp: res.main.temp,
    //     desc: res.weather[0].description
    //   }
    })

}