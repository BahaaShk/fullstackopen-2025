import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import weather from "./services/weather";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(null);
  // weather data states
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(false);

  const BaseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

  useEffect(() => {
    axios
      .get(BaseUrl)
      .then((res) => {
        setCountries(res.data);
      })
      .catch((error) => {
        console.log("error occured ", error);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    const countryToShow =
      showCountry ||
      (filteredCountries.length === 1 ? filteredCountries[0] : null);

    if (
      !countryToShow ||
      !countryToShow.capital ||
      countryToShow.capital.length === 0
    ) {
      setWeatherData(null);
      return;
    }

    if (weatherData?.name === countryToShow.name.common) return;

    setWeatherLoading(true);
    setWeatherError(false);

    weather
      .getWeather(countryToShow.capital[0])
      .then((data) => {
        setWeatherData({ ...data, name: countryToShow.name.common }); // store country name
        setWeatherLoading(false);
      })
      .catch(() => {
        setWeatherError(true);
        setWeatherLoading(false);
      });
  }, [showCountry, filteredCountries]);

  return (
    <>
      <div>
        <label htmlFor="">find countries</label>
        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setShowCountry(null);
            setWeatherData(null);
          }}
        />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches. specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          <>
            {filteredCountries.map((country, index) => (
              <p key={index}>
                {country.name.common}
                <button
                  onClick={() => {
                    setShowCountry(country);
                  }}
                >
                  Show
                </button>
              </p>
            ))}
            {showCountry && (
              <div>
                <h3>{showCountry.name.common}</h3>
                <p>Capital {showCountry.capital}</p>
                <p>Area {showCountry.area}</p>
                <h4>Languages</h4>
                <ul>
                  {Object.values(showCountry.languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
                <img src={showCountry.flags.png} alt="flag" width="180" />
                {weatherLoading && <p>Loading weather...</p>}
                {weatherError && <p>Could not load weather data.</p>}
                {weatherData && (
                  <>
                    <h3>Weather in {showCountry.capital[0]}</h3>
                    <p>Temperature: {weatherData.main.temp} Celsius</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt="weather icon"
                    />
                    <p>Wind {weatherData.wind.speed} m/s</p>
                  </>
                )}
              </div>
            )}
          </>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h3>{filteredCountries[0].name.common}</h3>
            <p>Capital {filteredCountries[0].capital}</p>
            <p>Area {filteredCountries[0].area}</p>
            <h4>Languages</h4>
            <ul>
              {Object.values(filteredCountries[0].languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flags.png} alt="flag" width="180" />
            {weatherLoading && <p>Loading weather...</p>}
            {weatherError && <p>Could not load weather data.</p>}
            {weatherData && (
              <>
                <h3>
                  Weather in {(showCountry || filteredCountries[0]).capital[0]}
                </h3>
                <p>Temperature: {weatherData.main.temp} °C</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
                <p>Wind {weatherData.wind.speed} m/s</p>
              </>
            )}
          </div>
        ) : (
          <p>no matches</p>
        )}
      </div>
    </>
  );
}

export default App;
