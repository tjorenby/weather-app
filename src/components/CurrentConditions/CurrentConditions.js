import React from "react";

function CurrentConditions(props) {
  return (
    <div>
      <p>{props.weather.current.condition.text}</p>
      <img src={props.weather.current.condition.icon} alt="condition icon" />
      <p>{Math.round(props.weather.current.temp_f)}° f</p>
    </div>
  );
}

export default CurrentConditions;
