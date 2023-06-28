export const placeService = {
    getPlaces,
    addPlace
}
import { utils } from '../util/utils.js'
import { storageService } from '../services/async-storage.service.js'

const PLACES_KEY = 'placesDB'

const places = [
    {
        id: utils.makeId(),
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        weather: 'nice',
        createdAt: NaN,
        updatedAt: NaN
    },
    {
        id: utils.makeId(),
        name: 'Decentplace',
        lat: 31.047104,
        lng: 33.832384,
        weather: 'decent',
        createdAt: NaN,
        updatedAt: NaN
    }
]

function getPlaces() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(places)
        }, 2000)
    })
}

function addPlace(latLng, name) {
    const place = {
        id: utils.makeId,
        name,
        lat: latLng.lat,
        lng: latLng.lng,
        weather: 'mediocre',
        createdAt: Date.now()
    }
    storageService.post(PLACES_KEY, place)
}

function removePlace(placeId){
    storageService.remove(PLACES_KEY,placeId).then(console.log)
}
// const place = {
//     id,
//     name,
//     lat,
//     lng,~
//     weather,
//     createdAt,
//     updatedAt
// }



