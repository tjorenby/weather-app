import React, { useState, useEffect } from "react";
import Axios from "axios";
import ForecastEvent from "../ForecastEvent/ForecastEvent";

//Style Import
import "./App.css";
import CurrentConditions from "../CurrentConditions/CurrentConditions";

function App() {
  const [locationImg, setLocationImg] = useState("");
  const [location, setLocation] = useState("Minneapolis MN");
  const [threeDayForecast, setThreeDayForecast] = useState([]);
  const [weather, setWeather] = useState({});
  const [weatherDisplay, setWeatherDisplay] = useState("current");

  useEffect(() => {
    getLocationImg();
    getWeather();
  }, []);

  // Pulls in image of location (based on search criteria) from Google Places API
  const getLocationImg = () => {
    const corsUrl = "https://morning-refuge-72177.herokuapp.com/"; // CORS proxy server (hosted through personal heroku acct.)
    const placesRequestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${location}&key=AIzaSyDEiv2bkQNspJlw6_HVsvhEblSCxd_3YjY&inputtype=textquery&fields=name,photos`;

    Axios({
      method: "GET",
      url: corsUrl + placesRequestUrl,
    })
      .then((res) => {
        const photoRef =
          res?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
        const imgLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&maxwidth=700&maxheight=700`;

        setLocationImg(imgLookupURL);

        console.log("getLocationImg response is:", res);
      })
      .catch((err) => {
        console.error("getLocationImg Error is:", err);
      });
  };

  const getWeather = () => {
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

  const getWeatherSearch = () => {
    getWeather();
    getLocationImg();
  };

  //Sets className for the "app" div, based on current weather conditions. Changing className renders dynamic background images.
  const setAppClassName = () => {
    if (typeof weather.location != "undefined") {
      if (weather.current.condition.text.includes("cloudy")) {
        return "app cloudy";
      }

      if (weather.current.condition.text.includes("overcast")) {
        return "app overcast";
      }

      if (weather.current.condition.text.includes("rain")) {
        return "app rain";
      }

      if (weather.current.condition.text.includes("snow" || "blizzard")) {
        return "app snow";
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
        <div className="container">
          <div className="logo-box">
            <h1 className="logo">trueWeather</h1>
          </div>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Enter A Location"
              onChange={(event) => setLocation(event.target.value)}
            />
            <button className="btn" type="submit" onClick={getWeatherSearch}>
              Search!
            </button>
          </div>

          <div className="row">
            <div className="current-container col-md-8">
              {typeof weather.location != "undefined" ? (
                <div className="overlay">
                  <h1>{weather.location.name}</h1>

                  <div className="weather-box">
                    <div className="flex">
                      <label>
                        <p>Current Conditions</p>
                        <input
                          type="radio"
                          name="weather-type"
                          className=""
                          value="current"
                          onChange={(event) =>
                            setWeatherDisplay(event.target.value)
                          }
                        />
                      </label>
                      <label>
                        <p>Three Day Forecast</p>
                        <input
                          type="radio"
                          name="weather-type"
                          className=""
                          value="threeDay"
                          onChange={(event) =>
                            setWeatherDisplay(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>

                  {weatherDisplay === "current" ? (
                    <CurrentConditions weather={weather} />
                  ) : (
                    <div className="">
                      <p>{location}'s Three-Day Forecast</p>
                      <div className="threeday-card">
                        {threeDayForecast.map((item, i) => {
                          return <ForecastEvent item={item} key={i} />;
                        })}
                      </div>
                    </div>
                  )}
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
