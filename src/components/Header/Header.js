import React, { useEffect } from "react";
import Axios from "axios";

//Component Imports
import useInput from "../hooks/useInput";

//Style Imports
import { BsSearch } from "react-icons/bs";

function Header(props) {
  const setWeather = props.setWeather;
  const setThreeDayForecast = props.setThreeDayForecast;
  const setWeatherDisplay = props.setWeatherDisplay;
  const [location, bindLocation, resetLocation] = useInput("Minneapolis MN");

  //Runs getWeather on app load.
  useEffect(() => {
    getWeather();
  }, []);

  //Pulls in weather data from API using Axios and updates values for threeDayForecast and weather
  const getWeather = () => {
    Axios({
      method: "GET",
      url: `https://api.weatherapi.com/v1/forecast.json?key=d32d4fb29fb548779dd215808200812&q=${location}&days=3`,
    })
      .then((res) => {
        // console.log("getWeather res is:", res.data);
        setWeather(res.data);
        setThreeDayForecast(res.data.forecast.forecastday);
        resetLocation(); // resets Location value to empty string (clearing out the input field)
      })
      .catch((err) => {
        console.error(" getWeather error is:", err);
      });
  };

  // function is triggered on keyPress (Enter) or on mouseDown (clicking on SpyGlass icon). Runs getWeather and setWeatherDisplay
  const getWeatherSearch = (event) => {
    if (event.key === "Enter" || event.type === "mousedown") {
      getWeather();
      setWeatherDisplay("current"); // returns weatherDisplay to "current" (its default state)
    }
  };

  return (
    <div className="header-box">
      <div style={{ display: "flex" }}>
        <p style={{ fontWeight: "400" }} className="logo">
          the
        </p>
        <p style={{ color: "#f15f4a" }} className="logo">
          Weather
        </p>
      </div>

      <div className="search-box">
        <input
          {...bindLocation}
          type="text"
          className="search-bar"
          placeholder="Enter A Location"
          // value={location}
          // onChange={(event) => setLocation(event.target.value)}
          onKeyPress={getWeatherSearch}
        />

        <BsSearch className="search-btn" onMouseDown={getWeatherSearch} />
      </div>
    </div>
  );
}

export default Header;
