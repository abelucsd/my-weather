import React, { useState, useEffect } from 'react'
import Average from '../Average'
import BarGraph from '../BarGraph'
import './WeatherPage.css'
import axios from 'axios'

function WeatherPage() {
    const [theAPI, setTheAPI] = useState('')
    const [weatherData, setWeatherData] = useState([])
    const [location, setLocation] = useState('')

    function handleLocationChange(e) {
        console.log(e.target.value)
        setLocation(e.target.value)
    }

    /**
     * 1. onClick calls the backend for data from the weather api
     * 2. Should the unpacking be at the backend? yes, but no
     */
    function selectSevenDay() {
        console.log("clicked seven day")             

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
                console.log(res)
                let city_params = {lat: res.lat, lon: res.lon}
                axios.post("http://localhost:5000/get_city_data", city_params)
                .then(response => {
                    console.log(response)
                })
            })
    }

    const selectTenDay = () => (() => {

    })

    useEffect(() => {
        // set the default api
    }, [])
  return (
    <div className='weather-page'>
        <div className="weather-choices">
            <input type="text" className='city-choice' placeholder='City, State' onChange={handleLocationChange} />
            <>Selected City</>
            <button onClick={selectSevenDay} className='sevenday'>7 Day</button>
            <button onClick={selectTenDay} className='tenday'>10 Day</button>
        </div>
        <div className="weather-calculations">
            <>Pass props to Average</>
            <Average weatherData />
        </div>
        <div className="graph-display">
            <BarGraph weatherData />
        </div>

    </div>
  )
}

export default WeatherPage