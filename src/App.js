import React, { useState, useEffect } from "react";
import Axios from "axios";

//Style Import
import "./App.css";

function App() {
  const [locationImg, setLocationImg] = useState("");
  const [location, setLocation] = useState("Portland Oregon");
  const [currentConditions, setCurrentConditions] = useState(null);

  useEffect(() => {
    getLocationImg();
    getCurrentConditions();
    console.log("currentConditions are:", currentConditions);
  }, [setLocationImg]);

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
        const imgLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=AIzaSyDEiv2bkQNspJlw6_HVsvhEblSCxd_3YjY&maxwidth=700&maxheight=700`;

        setLocationImg(imgLookupURL);

        console.log("getLocationImg response is:", res);
        console.log("photoRef is:", photoRef);
      })
      .catch((err) => {
        console.error("getLocationImg Error is:", err);
      });
  };

  const getCurrentConditions = () => {
    Axios({
      method: "GET",
      url: `http://api.weatherapi.com/v1/current.json?key=c4fcda5512754f439fb191328202911&q=${location}`,
    })
      .then((res) => {
        console.log("getCurrentConditions res is:", res);
        setCurrentConditions(res.data.data);
      })
      .catch((err) => {
        console.error(" getCurrentConditons error is:", err);
      });
  };

  return (
    <div className="App">
      <h1>Place</h1>
      <img src={locationImg} alt="place" />
    </div>
  );
}

export default App;
