import React, { useState, useEffect } from "react";
import Axios from "axios";

//Style Imports
import { BsSearch } from "react-icons/bs";

function LocationSearch() {
  return (
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
  );
}

export default LocationSearch;
