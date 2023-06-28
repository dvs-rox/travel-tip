import { placeService } from '../services/place.service.js'
import { mapService } from '../services/map.service.js'
import { searchService } from '../services/search.service.js'
import { weatherService } from '../services/weather.service.js'

window.onload = onInit
window.onAddPlace = onAddPlace
window.onPanTo = onPanTo
window.onGetUserPos = onGetUserPos
window.onRemovePlace = onRemovePlace
window.onCopyLink = onCopyLink
window.onToggleModal = onToggleModal
window.onSearch = onSearch

window.markers = []

function onInit() {
    document.querySelector('[name="searchTxt"]').value = ''
    console.log('window.currLatLng:', window.currLatLng)
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
    //panning on load
    placeService.getPlaces().then(res => {
        renderPlacesList(res)
        renderMarkers(res)
        _panByQueryParams()
    }
    )
}

function onCopyLink() {
    const queryParams = `?lat=${window.currLatLng.lat}&lng=${window.currLatLng.lng}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryParams
    window.history.pushState({ path: newUrl }, '', newUrl)
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
    // const input = elInput = document.querySelector('.')
    const placeName = ev.target.search.value
    // mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
    console.log('window.currLatLng:', window.currLatLng)
    placeService.addPlace(window.currLatLng, placeName).then(res => {
        placeService.getPlaces().then(places => renderPlacesList(places))

    })

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
            document.querySelector('.user-pos').innerHTML =
                `
                You Are At<br>Latitude: ${pos.coords.latitude}<br>Longitude: ${pos.coords.longitude}`
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

function onSearch(ev) {
    ev.preventDefault()
    const val = document.querySelector('input[name=searchTxt]').value
    searchService.searchByAddress(val)
        .then(res => {
            window.currLatLng = res
            mapService.panTo(res.lat, res.lng)
            return res
        })
        .then(res => mapService.addMarker({ lat: res.lat, lng: res.lng }, val))

}


//PLACES STUFF AREA

function renderPlacesList(places) {
    // let places
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

function renderMarkers(places) {
    window.markers = []
    places.forEach(place => {
        window.markers.push(mapService.addMarker({ lat: place.lat, lng: place.lng }, place.name))
    })
    console.log(window.markers)
}
// function resetMarkers() {
//     window.markers.forEach(marker => {
//         marker.map=null
//     });
// }
function onToggleModal() {
    console.log('modal');
    document.querySelector('.add-plc-modal').classList.toggle('show')
}

function _panByQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)
    const pos = {
        lat: +queryParams.get('lat'),
        lng: +queryParams.get('lng')
    }

    if (!pos.lat && !pos.lng) return

    onPanTo(pos.lat, pos.lng)
    // const lang = queryParams.get('lang')
    // setLang(lang)
    // document.querySelector('[name="langSelect"]').value = lang
    // toggleRTL(lang)

    // updateFilterTxt(filterBy)
    // document.querySelector('[name="minRate"]').value = filterBy.minRate
    // document.querySelector('[name="maxPrice"]').value = filterBy.maxPrice
    // document.querySelector('[name="filter-by-search"]').value = filterBy.txt
    // setBookFilter(filterBy)
    // const bookId = queryParams.get('modal')
    // if (bookId) onRead(bookId)
}

