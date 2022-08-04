import React, { useState, useEffect } from 'react'
import WeatherPage from './pages/WeatherPage'
import Chart from 'chart.js/auto'

/**
 * props:
 * - weatherData[date ,[temperature, humidity]]
 */
function BarGraph(props) {
  const [chart, setChart] = useState('')

  /**
   * Initializes a new chart each weather data query
   * myChart:
   * - label: Temperature
   * - data: [] # temperature data inside weatherData
   * - backgroundColor[] set per temperature data
   * - borderColor[] set per temperature data
   */
  useEffect(() => {
    let temperatures = []
    let dates = []
    let humidities = []
    
    props.weatherData .forEach( (item, index) => {
      // item[1]: temperature, humidity
      dates.push(item[0]) // date
      temperatures.push((item[1][0].temperature - 273.15)* (9/5) + 32) // Kelvin to Fahrenheight
      humidities.push(item[1][0].humidity)
    })
    
    console.log(temperatures)
    let domChart = document.querySelector('#myChart')    
    const myChart = new Chart(domChart, {
      type: 'line',
      data: {
        labels: 'labels',
        datasets: [{
          label: 'Temperature',
          data: temperatures,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }      
  })
  return () => myChart.destroy()
  }, [props])

  return (
    <div>BarGraph
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  )
}

export default BarGraph