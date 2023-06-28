export const placeService = {
    getPlaces
}
import { utils } from '../util/utils.js'


const places = [
    {
        id:utils.makeId(),
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        weather:'nice',
        createdAt:NaN,
        updatedAt:NaN
    },
    {
        id:utils.makeId(),
        name: 'Decentplace',
        lat: 31.047104,
        lng: 33.832384,
        weather:'decent',
        createdAt:NaN,
        updatedAt:NaN
    }
]

function getPlaces() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(places)
        }, 2000)
    })
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



