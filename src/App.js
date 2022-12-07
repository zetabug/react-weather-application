import React, { useCallback } from "react";
import { useState, useEffect } from "react";

import Weather from "./components/Weather";
import LoadingIndicator from "./UI/LoadingIndicator";
import { BsFillGeoAltFill } from "react-icons/bs";

import "./app.css";

function App() {
  const [data, setData] = useState(null);
  const [place, setPlace] = useState(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  async function geoHandler() {
    setSearch("");
    setIsLoading(true);
    await navigator.geolocation.getCurrentPosition((position) => {
      const crd = position.coords;
      const latitude = crd.latitude;
      const longitude = crd.longitude;
      setLocation(`${latitude},${longitude}`);
    });
  }

  const fetchData = useCallback(async (search, location) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0173291af0msh62b3ca25953f210p13d732jsn66b4d9f97708",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${
      search || location
    }`;
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  }, []);

  useEffect(() => {
    fetchData(search, location).then((responseData) => {
      setPlace(responseData.location);
      setData(responseData.current);
      setIsLoading(false);
    });
  }, [location, search, fetchData]);

  return (
    <>
      <div className="container">
        <div className="widget-wrapper">
          <div className="weather-header">
            <h1>WEATHER</h1>
            {isLoading && <LoadingIndicator />}
          </div>
          <div className="search-sec">
            <input
              type="text"
              value={search}
              placeholder="Search by City..."
              onChange={handleSearch}
              className="city-search"
            />
            <button onClick={geoHandler} className="find-me-btn">
              <BsFillGeoAltFill size={18} />
            </button>
          </div>
          <br />
          <br />
          {<Weather place={place} data={data} />}
        </div>
      </div>
      <span className="credit">Ranvir@zetabug/github</span>
    </>
  );
}

export default App;
