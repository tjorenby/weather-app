import React, { useState } from "react";

//Components
import CurrentConditions from "../CurrentConditions/CurrentConditions";
import ForecastEvent from "../ForecastEvent/ForecastEvent";

function WeatherType(props) {
  const weather = props.weather;
  const threeDayForecast = props.threeDayForecast;
  const weatherDisplay = props.weatherDisplay;
  const setWeatherDisplay = props.setWeatherDisplay;

  return (
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
                  onChange={(event) => setWeatherDisplay(event.target.value)}
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
                    onChange={(event) => setWeatherDisplay(event.target.value)}
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
  );
}

export default WeatherType;
