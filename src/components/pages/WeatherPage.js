import React, { useState, useEffect } from 'react'
import Average from '../Average'
import BarGraph from '../BarGraph'

function WeatherPage() {
    const [theAPI, setTheAPI] = useState('')
    const [weatherData, setWeatherData] = useState([])

    // check api which options
    const selectSevenDay = () => (() => {
        // if not selected API then run an api request
        // Then, insert the response into state
    })

    const selectTenDay = () => (() => {

    })

    useEffect(() => {
        // set the default api
    }, [])
  return (
    <div className='weather-page'>
        <div className="weather-choices">
            <input type="text" className='city-choice' placeholder='City' />
            <>Selected City</>
            <button onClick={selectSevenDay}>7 Day</button>
            <button onClick={selectTenDay}>10 Day</button>
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