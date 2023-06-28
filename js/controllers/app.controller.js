import { placeService } from '../services/place.service.js'
import { mapService } from '../services/map.service.js'

window.onload = onInit
window.onAddPlace = onAddPlace
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
function onAddPlace() {
    console.log('Adding a place')
    // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
    console.log(window.currLatLng)
    placeService.addPlace(window.currLatLng,'puki')
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                //TODO: pan map to location
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(pos) {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}



//PLACES STUFF AREA

function renderPlacesList(places){
   const strHTMLs = places.map(place=>{
        return `
        <li>
        <h4>${place.name}<h4>
        <button onclick="onPanTo(${{lat:place.lat,lng:place.lng}})">Go</button>
        <button onclick="onRemovePlace(${place.id})">Delete</button>
        </li>
        `
    })
    document.querySelector('.places-list').innerHTML = strHTMLs.join('')
}

//TODO: render the places list, show place info
//in the list add buttons go and delete (CRUDL)
// const place = {
//     id,
//     name,
//     lat,
//     lng,
//     weather,
//     createdAt,
//     updatedAt
// }
