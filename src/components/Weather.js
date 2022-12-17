import "./Weather.css";

const Weather = (props) => {
  return (
    <div className="output-sec">
      <div className="location">
        {props.place.name}, {props.place.region}
      </div>
      <img src={props.data.condition.icon} alt="" />
      <div className="sky-status">{props.data.condition.text}</div>
      <div className="temp">Temperature : {props.data.temp_c}°C</div>
      <div className="humidity">Humidity : {props.data.humidity}</div>
    </div>
  );
};

export default Weather;
