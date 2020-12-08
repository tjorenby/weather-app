import React from "react";

//Style Imports
import { format } from "date-fns";

function CurrentConditions(props) {
  const localTime = format(new Date(props.weather.location.localtime), "p");

  return (
    <div className="current-box">
      <p style={{ fontSize: "20px" }}>{localTime}</p>
      <img src={props.weather.current.condition.icon} alt="condition icon" />
      <p>{props.weather.current.condition.text}</p>

      <p>{Math.round(props.weather.current.temp_f)}° f</p>
    </div>
  );
}

export default CurrentConditions;
