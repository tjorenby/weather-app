import React from "react";

//Style Imports
import moment from "moment";

function CurrentConditions(props) {
  const localTime = moment(props.weather.location.localtime).format(
    "YYYY-M-D H:mm"
  );
  return (
    <div className="current-box">
      <p style={{ fontSize: "20px" }}>
        {moment(localTime).format("LT")}
        {/* {props.weather.location.localtime} */}
      </p>
      <img src={props.weather.current.condition.icon} alt="condition icon" />
      <p>{props.weather.current.condition.text}</p>

      <p>{Math.round(props.weather.current.temp_f)}° f</p>
    </div>
  );
}

export default CurrentConditions;
