import React, { useState } from "react";
import Axios from "axios";

//Pulls in weather data from API using Axios and updates values for threeDayForecast and weather
function GetWeather(props) {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [location, setLocation] = useState("Minneapolis MN");
  const [weather, setWeather] = useState({});
  const [threeDayForecast, setThreeDayForecast] = useState([]);

  Axios({
    method: "GET",
    // url: `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${props.location}&days=3`,
    url: `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`,
  })
    .then((res) => {
      // console.log("getWeather res is:", res.data);
      setWeather(res.data);
      setThreeDayForecast(res.data.forecast.forecastday);
      setLocation(""); // resets Location value to empty string (clearing out the input field)
    })
    .catch((err) => {
      console.error(" getWeather error is:", err);
    });
}

export default GetWeather;
