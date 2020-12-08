import React from "react";

//Style Imports
import { format } from "date-fns";

function ForecastEvent(props) {
  const forecastDate = format(new Date(props.item.date), "PPPP");
  return (
    <div className="forecast-card">
      <p>{forecastDate}</p>
      <img src={props.item.day.condition.icon} alt="icon" />
      <p>{props.item.day.condition.text}</p>
      <p>High: {Math.round(props.item.day.maxtemp_f)}° f</p>
      <p>Low: {Math.round(props.item.day.mintemp_f)}° f</p>
    </div>
  );
}

export default ForecastEvent;
