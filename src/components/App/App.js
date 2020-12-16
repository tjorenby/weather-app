import React, { useState } from "react";

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
      const lowerCaseConditions = condition.toLowerCase();

      if (lowerCaseConditions.includes("clear")) {
        return "app clear";
      }

      if (lowerCaseConditions.includes("cloudy")) {
        return "app cloudy";
      }

      if (lowerCaseConditions.includes("overcast")) {
        return "app overcast";
      }

      if (lowerCaseConditions.includes("rain")) {
        return "app rain";
      }

      if (
        lowerCaseConditions.includes("snow") ||
        lowerCaseConditions.includes("blizzard") ||
        lowerCaseConditions.includes("snow showers")
      ) {
        return "app snow";
      }

      if (
        lowerCaseConditions.includes("fog") ||
        lowerCaseConditions.includes("foggy") ||
        lowerCaseConditions.includes("mist")
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
