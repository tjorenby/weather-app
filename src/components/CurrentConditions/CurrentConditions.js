import React from "react";

//Style Imports

function CurrentConditions(props) {
  return (
    <div className="current-box">
      <p>{Math.round(props.weather.current.temp_f)}°</p>
      <img src={props.weather.current.condition.icon} alt="condition icon" />
      <p style={{ fontSize: "20px" }}>{props.weather.current.condition.text}</p>
    </div>
  );
}

export default CurrentConditions;
