import React, { useState, useEffect } from 'react'
import WeatherPage from './pages/WeatherPage'
import Chart from 'chart.js/auto'
import './BarGraph.css'

/**
 * Plots temperature onto a line graph.
 * 
 * @param {
 * weatherData: list [date, [temperature, humidity]]
 * } props  
 * 
 * @returns A line graph.
 */
function BarGraph(props) {  

  /**
   * Initializes a new chart each weather data query.
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
    
    // put into separate function
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
    
    /* - Chart - */
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
          tension: 0.1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
          
        }]
      }, 
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'rgb(75, 192, 192)'
            }
          }
        },
        scales: {
          x: {            
            ticks: {
              color: 'black',
              
            },                                             
          },
          y: {
            ticks: {
              color: 'black'
            },
          }
        }        
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