import React, { useState, useEffect } from "react";
import Axios from "axios";

//Component Imports
import ForecastEvent from "../ForecastEvent/ForecastEvent";
import CurrentConditions from "../CurrentConditions/CurrentConditions";

//Style Import
import "./styles/app.css";
import "./styles/media.css";
import { BsSearch } from "react-icons/bs";

function App() {
  const [location, setLocation] = useState("Minneapolis MN");
  const [weather, setWeather] = useState({});
  const [threeDayForecast, setThreeDayForecast] = useState([]);
  const [weatherDisplay, setWeatherDisplay] = useState("current");

  //Runs getWeather on app load
  useEffect(() => {
    getWeather();
  }, []);

  //Pulls in weather data from API using Axios and updates values for threeDayForecast and weather
  const getWeather = () => {
    Axios({
      method: "GET",
      url: `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}&days=3`,
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
  };

  // function is triggered on keyPress (Enter) or on mouseDown (clicking on SpyGlass icon). Runs getWeather and setWeatherDisplay
  const getWeatherSearch = (event) => {
    if (event.key === "Enter" || event.type === "mousedown") {
      getWeather();
      setWeatherDisplay("current"); // returns weatherDisplay to "current" (its default state)
    }
  };

  //Sets className for the "app" div, based on current weather conditions. Changing className renders dynamic background images.
  const setAppClassName = () => {
    if (typeof weather.location != "undefined") {
      const condition = weather.current.condition.text;

      if (condition.includes("Clear")) {
        return "app clear";
      }

      if (condition.includes("Cloudy") || condition.includes("cloudy")) {
        return "app cloudy";
      }

      if (condition.includes("overcast") || condition.includes("Overcast")) {
        return "app overcast";
      }

      if (condition.includes("rain")) {
        return "app rain";
      }

      if (
        condition.includes("snow") ||
        condition.includes("blizzard") ||
        condition.includes("snow showers")
      ) {
        return "app snow";
      }

      if (
        condition.includes("fog") ||
        condition.includes("Foggy") ||
        condition.includes("Mist") ||
        condition.includes("Fog")
      ) {
        return "app fog";
      }

      return "app";
    }
  };

  //Test Logs
  // console.log("weather is:", weather);
  // console.log("threeDayForecast is:", threeDayForecast);
  //console.log("weatherDisplay is:", weatherDisplay);

  return (
    <div className={setAppClassName()}>
      <main>
        <div className="page-box">
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
                type="text"
                className="search-bar"
                placeholder="Enter A Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyPress={getWeatherSearch}
              />

              <BsSearch className="search-btn" onMouseDown={getWeatherSearch} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              {typeof weather.location != "undefined" ? (
                <div className="info-box">
                  <h1 className="location mb-5">
                    {weather.location.name}, {weather.location.region}
                  </h1>

                  <div className="weather-box">
                    <label
                      className={`tabs ${
                        weatherDisplay === "current" ? "tab-border" : ""
                      }`}
                    >
                      <p>Current Conditions</p>
                      <input
                        type="radio"
                        name="weather-type"
                        className="hide"
                        value="current"
                        checked={weatherDisplay === "current"}
                        onChange={(event) =>
                          setWeatherDisplay(event.target.value)
                        }
                      />
                    </label>
                    <label
                      className={`tabs ${
                        weatherDisplay === "threeDay" ? "active tab-border" : ""
                      }`}
                    >
                      <div>
                        <p>Three Day Forecast</p>
                        <input
                          type="radio"
                          name="weather-type"
                          className="hide"
                          value="threeDay"
                          checked={weatherDisplay === "threeDay"}
                          onChange={(event) =>
                            setWeatherDisplay(event.target.value)
                          }
                        />
                      </div>
                    </label>
                  </div>
                  <div className="weather-details-box">
                    {weatherDisplay === "current" ? (
                      <CurrentConditions weather={weather} />
                    ) : (
                      threeDayForecast.map((item, i) => {
                        return <ForecastEvent item={item} key={i} />;
                      })
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
