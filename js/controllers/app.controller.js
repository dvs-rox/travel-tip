import { placeService } from '../services/place.service.js'
import { mapService } from '../services/map.service.js'
import { searchService } from '../services/search.service.js'

window.onload = onInit
window.onAddPlace = onAddPlace
window.onPanTo = onPanTo
window.onGetUserPos = onGetUserPos
window.onRemovePlace = onRemovePlace
window.onSearch = onSearch

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
    placeService.getPlaces().then(res => renderPlacesList(res))
}
// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
function onAddPlace(ev) {
    ev.preventDefault()
    console.log('Adding a place')
    // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
    placeService.addPlace(window.currLatLng, 'puki').then(renderPlacesList)
    placeService.getPlaces().then(res => renderPlacesList(res))
}

function onRemovePlace(placeId) {
    placeService.removePlace(placeId).then(placeService.getPlaces().then(res => renderPlacesList(res)))
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

function onPanTo(lat, lng) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
    // mapService.panTo(35.6895, 139.6917)   TO TOKYO...
}

function onSearch(ev){
    ev.preventDefault()
    const val = document.querySelector('input[name=searchTxt]').value
    searchService.searchByAddress(val).then(console.log)
}


//PLACES STUFF AREA

function renderPlacesList(places) {
    // let places
    console.log(places)
    const strHTMLs = places.map(place => {
        return `
            <li>
            <h4>${place.name}<h4>
            <button onclick="onPanTo( ${place.lat},${place.lng})">Go</button>
            <button onclick="onRemovePlace('${place.id}')">Delete</button>
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
