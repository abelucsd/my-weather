const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())

app.post('/get_geo', (req, res) => { 
    // place api_key in env file
    console.log(API_KEY)
    let city_name = req.body.city
    let state = req.body.state
    let country = 'US'
    console.log(`Backend received params: city = ${city_name} and state = ${state}`)    
        
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${state},${country}&limit=5&appid=${API_KEY}`)
        .then(function (response) {
            // handle success
            // axios returns unpacked json 
            console.log(typeof(response.data))
            console.log(`Success axios: ${response.data}`) 
            res.json(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log("An error in axios portion of app /get_geo.")            
            res.json({"users": ["An error in axios portion of app /get_geo."]})
        })    
})

app.use(express.json())
app.post('/get_city_data', (req, res) => {    
    let lat = req.body.lat
    let lon = req.body.lon
    console.log(`Inside get_city_data lat = ${lat}, lon = ${lon}`)
    
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(function (response) {        
        // today's date                
        let temperature_data = response.data.list
        let temps = []
        let humids = []
        ret_val = {}
        temperature_data.forEach((temp_data) => {
            ret_val[temp_data["dt_txt"]] = []                       
            ret_val[temp_data["dt_txt"]].push({
                temperature: temp_data.main.temp,
                humidity: temp_data.main.humidity
            })      
        })     

        console.log(ret_val)

        res.send(ret_val)
    })
    .catch(function (error) {
        console.log(error)
    })        
})
    
app.listen(5000, () => {
    console.log("Listening")
})