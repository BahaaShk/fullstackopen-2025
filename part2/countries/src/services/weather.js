import axios from "axios";

const getWeather = (capital) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

return axios.get(baseURL).then((res) => res.data
).catch(error => console.log(error)
) 
};

export default { getWeather };
