/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import WeatherApi from "./api/WeatherApi";

const Filter = ({ filter, grabFilter }) => {
  return (
    <>
      <div>
        <p>
          filter: <input value={filter} onChange={grabFilter} />
        </p>
      </div>
    </>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const CountryView = ({
  matches,
  filter,
  viewClickedCountry,
  selectedCountry,
  clicked,
}) => {
  const [weather, setWeather] = useState({
    temp: null,
    icon: null,
    wind: null,
  });

  useEffect(() => {
    const fetchTemperature = async () => {
      if (filter && matches.length === 1 && !clicked) {
        const weatherData = await WeatherApi({
          match: matches[0].capital,
        });
        setWeather(weatherData);
      } else if (filter && clicked && selectedCountry) {
        const weatherData = await WeatherApi({
          match: selectedCountry.capital,
        });
        setWeather(weatherData);
      }
    };
    fetchTemperature();
  }, [matches, clicked, selectedCountry]);

  return (
    <>
      {filter && matches.length === 1 && !clicked ? (
        <>
          {matches.map((match) => (
            <>
              <h2>{match.name.common}</h2>
              <p> {match.capital}</p>
              <p> area: {match.area}</p>
              <h3> Languages</h3>
              <ul>
                {Object.values(match.languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>

              <img src={match.flags.png} alt="Flag" />
              <h2>Weather of {match.capital}</h2>
              {weather.temp !== null && <p>temperature: {weather.temp}°C</p>}
              <p>Weather image</p>
              {weather.icon !== undefined && (
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="Weather icon"
                />
              )}
              {weather.wind !== null && <p>wind: {weather.wind}°C</p>}
            </>
          ))}
        </>
      ) : (
        <></>
      )}
      {filter && matches.length > 1 && matches.length && !clicked ? (
        <div>
          {matches.map((match) => (
            <>
              <div>
                {match.name.common}
                <Button onClick={() => viewClickedCountry(match)} text="show" />
              </div>
            </>
          ))}
        </div>
      ) : (
        <div>
          <></>
        </div>
      )}
      {clicked && selectedCountry ? (
        <div>
          <>
            <>
              <h2>{selectedCountry.name.common}</h2>
              <p> {selectedCountry.capital}</p>
              <p> area: {selectedCountry.area}</p>
              <h3> Languages</h3>
              <ul>
                {Object.values(selectedCountry.languages).map(
                  (language, index) => (
                    <li key={index}>{language}</li>
                  )
                )}
              </ul>
              <img src={selectedCountry.flags.png} alt="Flag" />
              <h2>Weather of {selectedCountry.capital}</h2>
              {weather.temp !== null && <p>temperature: {weather.temp}°C</p>}
              {weather.icon !== null && (
                <p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="Weather icon"
                  />
                </p>
              )}
              {weather.wind !== null && <p>wind: {weather.wind}/ms</p>}
            </>
          </>
        </div>
      ) : (
        <div>
          <></>
        </div>
      )}
    </>
  );
};

const App = () => {
  const [payload, setPayload] = useState([]);
  const [filter, setFilter] = useState("");
  const [clicked, setClick] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const matches = filter
    ? payload.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const viewClickedCountry = (match) => {
    setSelectedCountry(match);
    setClick(true);
  };

  const ApiCall = async () => {
    const response = await fetch(
      "https://studies.cs.helsinki.fi/restcountries/api/all",
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setPayload(data);
  };

  const grabFilter = (event) => {
    const value = event.target.value;
    setFilter(value);
    if (value === "") {
      setClick(false);
      setSelectedCountry(null);
    }
  };
  useEffect(() => {
    if (payload.length === 0) {
      ApiCall();
    }
  }, []);

  return (
    <div>
      <Filter filter={filter} grabFilter={grabFilter} />
      <p>
        {payload.length > 0 && (
          <>
            <CountryView
              filter={filter}
              matches={matches}
              viewClickedCountry={viewClickedCountry}
              clicked={clicked}
              selectedCountry={selectedCountry}
            />
          </>
        )}
      </p>
    </div>
  );
};

export default App;
