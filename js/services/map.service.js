export const mapService = {
    initMap,
    addMarker,
    panTo
}

//TODO: Add queryparams integration for onload pan to sent coords

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            _initListeners(gMap)
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAEajVysYLyT8bZz3OvKrB7WvJa6_wocMs' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
//TODO: add event listener and fucntion on click on map, to save coords(lat/lng) .3
function _initListeners(map) {
    let infoWindow = new google.maps.InfoWindow()
    map.addListener("click", (mapMouseEv) => {
        infoWindow.close()
        infoWindow = new google.maps.InfoWindow({
            position: mapMouseEv.latLng
        })
        infoWindow.setContent(
            JSON.stringify(mapMouseEv.latLng.toJSON(), null, 2)
        )
        infoWindow.open(map)
    })
}