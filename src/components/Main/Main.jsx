import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
// import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
// import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  //   const handleToggleSwitchChange = () => {
  //     currentTemperatureUnit === "F"
  //       ? setCurrentTemperatureUnit("C")
  //       : setCurrentTemperatureUnit("F");
  //   };
  return (
    // <CurrentTemperatureUnitContext.Provider>
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp?.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
    // </CurrentTemperatureUnitContext.Provider>
  );
}

export default Main;
