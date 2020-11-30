import React from "react";

function CurrentConditions(props) {
  return (
    <div>
      <p>{props.weather.current.condition.text}</p>
      <p>Current Temp: {props.weather.current.temp_f}</p>
      <img src={props.weather.current.condition.icon} alt="condition icon" />
    </div>
  );
}

export default CurrentConditions;
