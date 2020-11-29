import React, { useState, useEffect } from "react";
import Axios from "axios";

//Style Import
import "./App.css";

function App() {
  const [locationImg, setLocationImg] = useState("");
  const [location, setLocation] = useState("Portland Oregon");
  const [currentConditions, setCurrentConditions] = useState({});
  const [threeDayForecast, setThreeDayForecast] = useState([]);

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
        // console.log("photoRef is:", photoRef);
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
        console.log("getThreeDayForecast res is:", res.data);
        setThreeDayForecast(res.data.forecast.forecastday);
        setCurrentConditions(res.data.current);
      })
      .catch((err) => {
        console.error(" getThreeDayForecast error is:", err);
      });
  };

  //Test Logs
  console.log("currentConditions are:", currentConditions);
  console.log("threeDayForecast is:", threeDayForecast);

  return (
    <div className="container">
      <h1>Place</h1>
      <img src={locationImg} alt="place" />
      {/* <p>Current Temp: {currentConditions.current.feelslike_f}</p> */}
    </div>
  );
}

export default App;
