import React, { useState, useEffect } from "react";
import Axios from "axios";

//Component Imports
import ForecastEvent from "../ForecastEvent/ForecastEvent";
import CurrentConditions from "../CurrentConditions/CurrentConditions";

//Style Import
import "./App.css";

import { BsSearch } from "react-icons/bs";

function App() {
  const [location, setLocation] = useState("Minneapolis MN");
  const [threeDayForecast, setThreeDayForecast] = useState([]);
  const [weather, setWeather] = useState({});
  const [weatherDisplay, setWeatherDisplay] = useState("current");

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = (event) => {
    Axios({
      method: "GET",
      url: `http://api.weatherapi.com/v1/forecast.json?key=ae002df183ea43ae892202913202911&q=${location}&days=3`,
    })
      .then((res) => {
        console.log("getWeather res is:", res.data);
        setWeather(res.data);
        setThreeDayForecast(res.data.forecast.forecastday);
      })
      .catch((err) => {
        console.error(" getThreeDayForecast error is:", err);
      });
  };

  const getWeatherSearch = (event) => {
    if (event.key === "Enter" || event.type === "mousedown") {
      getWeather();
      setWeatherDisplay("current"); // returns weatherDisplay to "current" (its default state)
      setLocation(""); // resets Location value to empty string (clearing out the input field)
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
        condition.includes("Mist")
      ) {
        return "app fog";
      }

      return "app";
    }
  };

  //Test Logs
  // console.log("weather is:", weather);
  // console.log("threeDayForecast is:", threeDayForecast);
  console.log("weatherDisplay is:", weatherDisplay);

  return (
    <div className={setAppClassName()}>
      <main className="">
        <div className="page-box">
          <div className="header-box">
            <h1 className="logo">trueWeather</h1>
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

                  <div className="">
                    <fieldset
                      value={weatherDisplay}
                      // onChange={(event) =>
                      //   setWeatherDisplay(event.target.value)
                      // }
                      className="weather-box"
                    >
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
                          weatherDisplay === "threeDay"
                            ? "active tab-border"
                            : ""
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
                    </fieldset>
                  </div>
                  <div className="threeday-card">
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
