import React from "react";

function CurrentConditions(props) {
  return (
    <div className="forecast-card">
      <p>{props.weather.location.localtime}</p>
      <img src={props.weather.current.condition.icon} alt="condition icon" />
      <p>{props.weather.current.condition.text}</p>

      <p>{Math.round(props.weather.current.temp_f)}° f</p>
    </div>
  );
}

export default CurrentConditions;
