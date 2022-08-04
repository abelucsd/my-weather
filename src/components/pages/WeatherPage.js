import React, { useState, useEffect } from 'react'
import Average from '../Average'
import BarGraph from '../BarGraph'
import './WeatherPage.css'
import axios from 'axios'
import { eachDayOfInterval } from "date-fns";

function WeatherPage() {
    const [theAPI, setTheAPI] = useState('')
    const [weatherData, setWeatherData] = useState([])
    const [location, setLocation] = useState('')

    function handleLocationChange(e) {
        console.log(e.target.value)
        setLocation(e.target.value)
    }

    /**
     * Move to server side later
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
     * 1. onClick calls the backend for data from the weather api
     * 2. Should the unpacking be at the backend? yes, but no
     * Combine with Five Day DRY
     */
    function selectOneDay() {        
        console.log("Clicked one day")                
        var today = new Date();        
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd
        console.log(today)
        
        getWeatherData([today])
    }

    function selectFiveDay() {
        console.log('selected five day')     
        var currDay = new Date()                       
        let dates = []
        let counter = 0        
        while ( counter < 5 ) {   
            let newDay = new Date()
            newDay.setDate(currDay.getDate() + counter)                                  
            var dd = String(newDay.getDate()).padStart(2, '0')
            var mm = String(newDay.getMonth() + 1).padStart(2, '0')
            var yyyy = newDay.getFullYear()
            newDay = yyyy + '-' + mm + '-' + dd                        
            dates.push(newDay) 
            counter = counter + 1
        }
        
        getWeatherData(dates)
    }

    useEffect(() => {
        // set the default api
    }, [])

  return (
    <div className='weather-page'>
        <div className="weather-choices">
            <input type="text" className='city-choice' placeholder='City, State' onChange={handleLocationChange} />
            <>Selected City</>
            <button onClick={selectOneDay} className='sevenday'>1 Day</button>
            <button onClick={selectFiveDay} className='tenday'>5 Day</button>
        </div>
        <div className="weather-calculations">
            <>Pass props to Average</>
            <Average weatherData={weatherData} />
        </div>
        <div className="graph-display">
            <BarGraph weatherData={weatherData} />
        </div>

    </div>
  )
}

export default WeatherPage