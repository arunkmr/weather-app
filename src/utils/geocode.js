const request = require('request')

const geocode = (address,callback) => {
    //const url1 ='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20angeles.json?access_token=pk.eyJ1IjoiYXJ1bmFtaXJ0aGEiLCJhIjoiY2twc2RhZTVnMDBhNDJucWxxcGtnZW40cSJ9.SCWWoyK5scrNlPp0n8GqMw'
    const url1 ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYXJ1bmFtaXJ0aGEiLCJhIjoiY2w4Ym43cTZwMDh5NDNucGh1bjZha2U2ciJ9.-PzAZCVp9nZZOqwNgURICA'
    request({ url:url1, json:true }, (error, response)=>{
       if(error){
            callback('Unable to connect the location services', undefiend)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find the location', undefined)           
        }
        else{
            callback(undefined, {
                Latitude : response.body.features[0].center[0],             
                Longitude: response.body.features[0].center[1],
                PlaceNae: response.body.features[0].place_name
            } )
        }
    }) 
}
module.exports = geocode 