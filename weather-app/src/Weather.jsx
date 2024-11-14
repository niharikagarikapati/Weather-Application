import React, { useEffect, useRef, useState } from "react";
import "./index.css"; // Assuming you're still using some custom styles
import search from "/search.png";
import Sun from "/clear.png";
import Humid from "/humidity.png";
import Wind from "/wind.png";
import cloud from "/cloud.png";
import drizzle from "/drizzle.png";
import rainy from "/rain.png";
import snow from "/snow.png";

const Weather = () => {
  const [weatherdata, setweatherdata] = useState(false);
  const allicons = {
    "01d": Sun,
    "01n": Sun,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rainy,
    "09n": rainy,
    "10d": rainy,
    "10n": rainy,
    "13d": snow,
    "13n": snow,
  };
  const inputref = useRef();

  const Search = async (city) => {
    if (city === "") {
      alert("Enter the city name");
    }
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_API_ID
      }`;
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        alert("Enter valid city name");
      }
      const icons = allicons[data.weather[0].icon] || Sun;
      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icons,
      });
    } catch (error) {
      setweatherdata(false);
      console.log("Error in fetching the data");
    }
  };

  useEffect(() => {
    Search("New York");
  }, []);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-emerald-400 to-cyan-600 flex flex-col p-6 items-center">
      <div className="flex flex-row-reverse items-center rounded-3xl bg-white p-2 gap-2 mb-4">
        <input
          className="border-none focus:outline-none rounded-md p-2"
          ref={inputref}
          type="search"
          id="default-search"
          placeholder="Search"
          required
        />
        <img
          src={search}
          alt="Search icon"
          onClick={() => Search(inputref.current.value)}
          className="cursor-pointer"
        />
      </div>
      <div className="text-center">
        <img
          src={weatherdata.icon}
          className="flex items-center justify-center"
          alt="Weather icon"
        />
        <p className="text-white font-bold text-4xl">
          {weatherdata.temperature}°C
        </p>
        <p className="text-white font-bold text-xl">{weatherdata.location}</p>
        <div className="flex items-center justify-center mt-2">
          <img src={Humid} className="w-6 mr-2 size-6" alt="Humidity icon" />
          <p className="text-amber-300 text-xl">{weatherdata.humidity}</p>
          <span className="text-white ml-1 font-mono">Humidity</span>
        </div>
        <div className="flex items-center justify-center mt-2">
          <img src={Wind} className="w-6 mr-2 size-6" alt="Wind icon" />
          <p className="text-amber-300 text-xl">{weatherdata.windspeed}</p>
          <span className="text-white ml-1 font-mono">Windspeed</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
