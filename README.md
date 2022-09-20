# My Weather

## Tools and Frameworks
- React.js
- Axios.js
- Express.js
- Weather API

## Current State
- Server side
   * Uses the Weather API to get geo data and weather data based on geo data.
- Frontend 
   * Able to get input from user.
   * Displays weather averages of the place selected.
   * Displays weather data on a graph.
- Scalability
   * User Interface has a toolbar which could include pages in the future.
   * Graph could be allowed to take various data through additions on the certain Components.
   * Weather data calculations are made by the developer which makes the data displayed versatile. The API is only used to grab general weather data.

## Requirements

- Use data from different cities.
- Displays weather data with a graph.
- Calculations on the data
- Scalable
- Eventually a locator to have a default city

## Plan

### Navbar - Scalability

### Weather Page
- Select City - Eventually autofill
- Bar graph - displays weather in days according to a button
    * Could transform according to API used (issued through the button pressed)
    * UseEffect [] -> default API method. Run the method 
    * On method change -> new API method runs
    * No graph shown at default
- Buttons
    * Just to switch API methods
- Calculation
    * Average
        * Using data from a component state
        * Includes a quote which is an output from a number range.
- Additionals?:
    * Use a locator to have a default city
    * F to C

### Sprint Order
- Make the backend
- Order the page cells
- Calculate Average Data from the API data
- Be able to pass requests from user into the API (city, buttons)
- Bar graph
