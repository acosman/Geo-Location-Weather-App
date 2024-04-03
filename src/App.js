import React, { useState } from "react";
import axios from "axios";

function App() {
  const apiKey = 'f026e77fa7cd8e90aee1e39c693dd9dc'; // Use your actual OpenWeatherMap API key

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
      axios.get(url).then((response) => {
        setData(response.data);
      }).catch(error => console.error("Error fetching data:", error));
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input 
          value={location} 
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"/>
      </div>
      {/* Conditional rendering based on data availability */}
      {data.main && (
        <>
          <div className="top-">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h1>{`${data.main.temp}°C`}</h1>
            </div>
            <div className="description">
              {data.weather && <p>{data.weather[0].main}</p>}
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{`${data.main.feels_like}°C`}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{`${data.main.humidity}%`}</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{`${data.wind.speed} MPH`}</p> <p>Wind Speed</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
