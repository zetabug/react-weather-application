import React, { useCallback } from "react";
import { useState, useEffect } from "react";

import Weather from "./components/Weather";
import LoadingIndicator from "./UI/LoadingIndicator";

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

  let display = data ? (
    <Weather place={place} data={data} />
  ) : (
    <div className="flex flex-col items-center justify-center bg-slate-700 rounded-xl p-[1rem]">
        <p className="text-2xl">no data found</p>
        <p className="text-3xl">😬</p>
    </div>
  );

  return (
    <div className="flex h-[100vh] w-[100vw] overflow-hidden flex-col items-center  bg-amber-200 ">
      <header className="h-[10vh] w-[100vw] bg-slate-700 flex items-center justify-center">
        <h1 className="text-white text-2xl">WEATHER APPLICATION</h1>
      </header>
      <div className="h-[10vh] w-[100vw] flex  items-center justify-center">
        <input
          className="h-[2rem] border-b-2 border-b-slate-700 text-slate-700 px-2"
          type="text"
          value={search}
          placeholder="Search by City..."
          onChange={handleSearch}
        />
      </div>
      <div className="h-[10vh] w-[100vw] flex items-center justify-center ">
        <hr className="border-4 absolute w-[90vw] border-slate-700 z-0" />
        <div className="flex items-center justify-center h-[10vh] w-[10vh] rounded-full bg-slate-700 text-white text-2xl z-10">
          <p>or</p>
        </div>
      </div>
      <div className="h-[10vh] w-[100vw] flex items-center justify-center ">
        <button
          className="p-4 bg-slate-700 rounded-xl text-lg text-white"
          onClick={geoHandler}
        >
          Find me!
        </button>
      </div>
      <div className="h-[50vh] w-[100vw] flex flex-col items-center justify-center text-white">
        {isLoading ? <LoadingIndicator /> : display}
      </div>
      <footer className="h-[10vh] w-[100vw] bg-slate-700 text-white flex items-center justify-end pr-[1rem]">
        <span>Ranvir@zetabug/github</span>
      </footer>
    </div>
  );
}

export default App;
