/* eslint-disable react/prop-types */

const WeatherApi = async ({ match }) => {
  const stringMatch = match[0];
  const api_key = import.meta.env.api_key;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${stringMatch}&units=metric&appid=${api_key}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  const temp = data.main["temp"];
  const icon = data.weather[0].icon;
  const wind = data.wind["speed"];
  return { temp, icon, wind };
};

export default WeatherApi;
