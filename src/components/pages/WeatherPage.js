import React, { useState, useEffect } from 'react'
import Average from '../Average'
import BarGraph from '../BarGraph'
import './WeatherPage.css'
import axios from 'axios'

/**
 * Displays weather data based on user's button query.
 * 
 * @returns A page with user queries, temperature averages, 
 * and a graph
 */
function WeatherPage() {    
    const [weatherData, setWeatherData] = useState([])
    const [location, setLocation] = useState('')

    /**
     * Move to server side later
     * Requests geo data which is used to request city temperature data 
     * to set into weatherData use state.
     */
    function getWeatherData(dates) {
        let city = location
        let state = ''
        try {
            city = location.split(",")[0].trim()
            state = location.split(",")[1].trim()
        }
        catch {
            console.log("Only city input.")
        }

        const params = {city: city, state: state}
        axios.post("http://localhost:5000/get_geo", params)
            .then( res => {
                /**
                 * res.data: Receives list[country, lat, lon, city, state]
                 * Need lat and lon to access specific city data
                 * Calls could be handled in server side. But server side is hidden.
                 */
                return res.data[0]
            })
            .then( res => {                
                let city_params = {lat: res.lat, lon: res.lon}
                axios.post("http://localhost:5000/get_city_data", city_params)
                .then(response => {
                    // {temperatures[] in kelvin, humidities[]}                    
                    return response.data
                })
                .then(response => {
                    // either one or five days
                    // then set to weatherData
                    console.log("Setting to setWeatherData")
                    console.log(dates)
                    let result = []
                    for (const [key, value] of Object.entries(response)) {
                        // loop through the dates parameter
                        dates.forEach( date => {
                            if (key.includes(date)) {
                                result.push([key, value])
                            }
                        })
                    }
                    setWeatherData(result)
                })
                .catch(error => {
                    console.log("Error in api post /get_city_data")
                })
            })
            .catch ( error => {
                console.log("Error in api post /get_city_data")
            })                
    }
    
    /**
     * Sets weatherData use state based on given days.
     */
    function queryDays(days) {
        console.log('selected five day')     
        var currDay = new Date()                       
        let dates = []
        let counter = 0        
        while ( counter < days ) {   
            let newDay = new Date()
            newDay.setDate(currDay.getDate() + counter)                                  
            var dd = String(newDay.getDate()).padStart(2, '0')
            var mm = String(newDay.getMonth() + 1).padStart(2, '0')
            var yyyy = newDay.getFullYear()
            newDay = yyyy + '-' + mm + '-' + dd                        
            dates.push(newDay) 
            counter = counter + 1
        }
        
        // Sets weatherData
        getWeatherData(dates)
    }

    useEffect(() => {        
    }, [])

  return (
    <div className='weather-page'>
        <div className="weather-choices">
            <input type="text" className='city-choice' placeholder='City, State' onChange={(e) => setLocation(e.target.value)} />                        
            <button onClick={() => queryDays(1)} className='oneday'>1 Day</button>
            <button onClick={() => queryDays(5)} className='fiveday'>5 Day</button>
        </div>
        <div className="weather-calculations">            
            <Average weatherData={weatherData} />
        </div>
        <div className="graph-display">
            <BarGraph weatherData={weatherData} />
        </div>

    </div>
  )
}

export default WeatherPage