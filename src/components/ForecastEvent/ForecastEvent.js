import React from "react";

function ForecastEvent(props) {
  return (
    <div className="forecast-card">
      <p>{props.item.date}</p>
      <img src={props.item.day.condition.icon} alt="icon" />
      <p>{props.item.day.condition.text}</p>
      <p>High: {props.item.day.maxtemp_f}</p>
      <p>Low: {props.item.day.mintemp_f}</p>
    </div>
  );
}

export default ForecastEvent;
