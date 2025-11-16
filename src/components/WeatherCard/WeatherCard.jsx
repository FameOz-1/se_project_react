import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return option.day === weatherData.isDay;
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}
        &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`card showing ${weatherOption?.day ? "day" : "night"}time weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
