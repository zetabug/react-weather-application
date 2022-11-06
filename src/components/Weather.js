import "./Weather.css";

const Weather = ({ place, data }) => {
  return (
    <div className="output-sec">
      <div className="location">
        {place.name}, {place.region}
      </div>
      <img src={data.condition.icon} alt="" />
      <div className="sky-status">{data.condition.text}</div>
      <div className="temp">Temperature : {data.temp_c}°C</div>
      <div className="humidity">Humidity : {data.humidity}</div>
    </div>
  );
};

export default Weather;
