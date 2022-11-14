import { useEffect, useState } from "react";

const Weather = (props) => {
  const [iconSize, setIconSize] = useState(
    window.innerHeight < 700 ? 64 : 128
  );

  useEffect(() => {
    setIconSize(window.innerHeight < 700 ? 64 : 128);
  }, [window.innerHeight]);

  return (
    <div className="flex flex-col items-center gap-[.8rem] text-2xl border-8 rounded-lg border-red-800 p-[1rem] bg-slate-700">
      <div className="uppercase">
        {props.place.name}, {props.place.region}
      </div>
      <img
        width={iconSize}
        height={iconSize}
        src={props.data.condition.icon}
        alt={props.data.condition.text}
      />
      <div>{props.data.condition.text}</div>
      <div>Temperature : {props.data.temp_c}°C</div>
      <div>Humidity : {props.data.humidity}</div>
    </div>
  );
};

export default Weather;
