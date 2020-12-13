import React, { useState, useEffect } from "react";

//Component Imports
import Header from "../Header/Header";
import WeatherType from "../WeatherType/WeatherType";

//Style Import
import "./styles/app.css";
import "./styles/media.css";

function App() {
  const [weather, setWeather] = useState({});
  const [threeDayForecast, setThreeDayForecast] = useState([]);
  const [weatherDisplay, setWeatherDisplay] = useState("current");

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

  return (
    <div className={setAppClassName()}>
      <main>
        <div className="page-box">
          <Header
            setWeather={setWeather}
            setThreeDayForecast={setThreeDayForecast}
            setWeatherDisplay={setWeatherDisplay}
          />
          <WeatherType
            weather={weather}
            threeDayForecast={threeDayForecast}
            weatherDisplay={weatherDisplay}
            setWeatherDisplay={setWeatherDisplay}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
