import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

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

  return (
    <>
      <div>
        <label htmlFor="">find countries</label>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches. specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          
            filteredCountries.map((country,index) => (
              
              <p key={index}>{country.name.common}</p>
              
            ))
          
        ) :  filteredCountries.length === 1 ? (
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
          <img
            src={filteredCountries[0].flags.png}
            alt="flag"
            width="180"
          />
          </div>
        ) : (<p>no matches</p>)}
      </div>
    </>
  );
}

export default App;
