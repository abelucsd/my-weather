### Weather API

* Key: REACT_APP_WEATHER_API_KEY
* API Call: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API KEY}
* api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API KEY}
* i.e. : api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid={API KEY}}

#### Deconstructing the API Data

* https://openweathermap.org/forecast5
* Date: list[].dt_txt
    * "dt_txt": "2022-03-15 15:00:00"
* Temperatures: list[].main
    * .temp
    * .temp_min
    * .temp_max
    * .humidity

### Lat, Lon Parameters

* Use Geocoder API
    * http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API KEY}
    * i.e. : http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API KEY}



### To Run the Express Server

* npm run dev