import React, { useState, useEffect } from 'react'
import WeatherPage from './pages/WeatherPage'
import Chart from 'chart.js/auto'
import './BarGraph.css'

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
      let dateComponents = item[0].split(" ")
      let date = ''      
      dateComponents[0].split("-").forEach( (part, i) => {
        if (i > 0) {
          date = date + part + "-"
        }
      })
      date = date.slice(0, -1)

      let time = dateComponents[1].split(":")[0]
      let post = ''
      if (time >= 12) {
        post = " PM"
      }
      else {
        post = " AM"
      }
      time = Number(time) % 12
      if (time == 0) {
        time = 12
      }
      time = time + post

      dates.push(date + " " + time) // date

      temperatures.push((item[1][0].temperature - 273.15)* (9/5) + 32) // Kelvin to Fahrenheight
      humidities.push(item[1][0].humidity)
    })
    
    console.log(temperatures)
    let domChart = document.querySelector('#myChart')    
    const myChart = new Chart(domChart, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Temperature',
          data: temperatures,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }, 
      options: {
        maintainAspectRatio: false,
      }   
  })
  return () => myChart.destroy()
  }, [props])

  return (
    <div class="bar-graph">
      <canvas id="myChart" ></canvas>
    </div>
  )
}

export default BarGraph