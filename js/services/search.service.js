//documentation: https://developers.google.com/maps/documentation/geocoding/requests-geocoding (no api key needed??)
// TODO: Implement search: user enters an address (such as Tokyo) use the google
// Geocode API to turn it into cords (such as: {lat: 35.62, lng:139.79})
// pan the map and also add it as new place.
//api stuff https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAEajVysYLyT8bZz3OvKrB7WvJa6_wocMs
export const searchService = {
    searchByAddress,
}
function searchByAddress(str) {
    let searchParams = str.split(' ').join('+')
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchParams}&key=AIzaSyAEajVysYLyT8bZz3OvKrB7WvJa6_wocMs`).then(res=>res.data.results[0].geometry.location)
    // console.log(searchParams)
}