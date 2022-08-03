import React, { useState, useEffect } from 'react'

/**
 * props: weatherData
 * weatherData:
 *  An array of [date, [temperature, humidity]]
 */
function Average(props) {
  const [theAverage, setTheAverage] = useState(0)

  /**
   * Calculate the average among the 3 hour iterations
   */
  function calcAverage() {
    let total_temp = 0
    props.weatherData.forEach( (item) => {
      // item[1][0] contains temperature, humidity
      total_temp = total_temp + item[1][0].temperature
    })        
    setTheAverage(Math.floor(total_temp/props.weatherData.length))
  }

  useEffect(() => { 
    console.log(props.weatherData)   
    calcAverage()
  },)

  return (
    <div>
      <div>
        {theAverage ? theAverage : ''}
      </div>
    </div>
  )
}

export default Average