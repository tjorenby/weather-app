import React from "react";

//Style Imports
import moment from "moment";

function CurrentConditions(props) {
  return (
    <div className="current-box">
      <p>{moment(props.weather.location.localtime).format("LT")}</p>
      <img src={props.weather.current.condition.icon} alt="condition icon" />
      <p>{props.weather.current.condition.text}</p>

      <p>{Math.round(props.weather.current.temp_f)}° f</p>
    </div>
  );
}

export default CurrentConditions;
