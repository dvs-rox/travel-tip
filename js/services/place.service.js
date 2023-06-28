export const placeService = {
    getPlaces
}


const places = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
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
//     lng,
//     weather,
//     createdAt,
//     updatedAt
// }



