const request = require("request")

const forecast = (latitude, longitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=d3ef865e2d246ffe2913455f84ca422c&query='+latitude+','+longitude+'&units=f'
    request({url:url, json:true},(error, response) =>{
         if(error){
            callback("Unable to Connect", undefined)
         }
         else if(response.body.error){
            callback("Unable to find the location", undefined)
         }
         else{
            callback(undefined, response.body.current.weather_descriptions[0] +'It is currently '+response.body.current.temperature+' degrees out. There is a '+response.body.current.feelslike+'% chances of rain.')
         }
    })
} 
module.exports = forecast