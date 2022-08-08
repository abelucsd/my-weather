import React, { useState, useEffect } from 'react'
import './Average.css'
/**
 * props: weatherData
 * weatherData:
 *  An array of [date, [temperature, humidity]]
 */


/**
 * Calculates the average temperature and humidity.
 * 
 * @param {
 * weatherData: list [
 *  date, 
 *    [
 *      temperature,
 *      humidity
 *    ] - 3 hour increments
 *  ]
 * } props  
 * 
 * @returns Grid of average temperature and humidity
 */
function Average(props) {
  const [theAverage, setTheAverage] = useState(0)
  const [humidity, setHumidity] = useState(0)

  /**
   * Calculate the average temperature and humidty.   
   */
  function calcAverage() {
    let total_temp = 0
    let total_hum = 0
    props.weatherData.forEach( (item) => {
      // item[1][0] contains temperature, humidity      
      total_temp = total_temp + (item[1][0].temperature - 273.15)*(9/5) + 32
      total_hum = total_hum + item[1][0].humidity
    })        
    setTheAverage(Math.floor(total_temp/props.weatherData.length))
    setHumidity(Math.floor(total_hum/props.weatherData.length))
  }  

  useEffect(() => {      
    calcAverage()
  }, [props])

  return (
    <div className="average-page">
      <div className="average-header"></div>
      <div className="average-grid">
        <div className="average-header-temp">{theAverage ? 'Temp' : ''}</div>
        <div className="average-header-humidity">{humidity ? 'Humidity': ''}</div>
        <div className="average-temp-calc">        
          {theAverage ? theAverage : ''}
        </div>
        <div className="average-humidity-calc">
          {humidity ? humidity : ''}
        </div>      
      </div>
    </div>
  )
}

export default Average