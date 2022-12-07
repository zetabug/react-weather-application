import "./Weather.css";

const Weather = (props) => {
  return (
    <>
      {props.data && props.place ? (
        <div className="output-sec">
          <div className="location">
            <p title={props.place.name}>{props.place.name}</p>
            <p>{props.place.region}</p>
          </div>
          <img className="status-img" src={props.data.condition.icon} alt="" />
          <div className="sky-status">{props.data.condition.text}</div>
          <div className="temp">Temperature : {props.data.temp_c}°C</div>
          <div className="humidity">Humidity : {props.data.humidity}</div>
        </div>
      ) : (
        <div className="output-sec">
          <div className="location">Please enter a city...</div>
          <div className="sky-status">N/A</div>
          <div className="temp">Temperature : -999°C</div>
          <div className="humidity">Humidity : 0%</div>
        </div>
      )}
    </>
  );
};

export default Weather;
