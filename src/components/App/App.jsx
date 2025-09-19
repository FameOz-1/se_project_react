import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, APIkey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const [items] = useState([defaultClothingItems]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothingItems={items}
        />
      </div>
      <>
        {activeModal === "add-garment" && (
          <ModalWithForm
            buttonText="Add garment"
            title="New garment"
            activeModal={activeModal}
            onClose={closeActiveModal}
          >
            <label htmlFor="name" className="modal__label">
              Name
              <input
                type="text"
                className="modal__input"
                id="name"
                placeholder="What should we call you?"
              />
            </label>
            <label htmlFor="imageUrl" className="modal__label">
              Image{" "}
              <input
                type="url"
                className="modal__input"
                id="imageUrl"
                placeholder="Image URL"
              />
            </label>
            <fieldset className="modal__radio-button">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  id="hot"
                  type="radio"
                  name="weather"
                  value="hot"
                  className="modal__radio-input"
                />{" "}
                Hot
              </label>
              <label
                htmlFor="warm"
                className="modal__label modal__label_type_radio"
              >
                <input
                  id="warm"
                  type="radio"
                  name="weather"
                  value="warm"
                  className="modal__radio-input"
                />{" "}
                Warm
              </label>
              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                <input
                  id="cold"
                  type="radio"
                  name="weather"
                  value="cold"
                  className="modal__radio-input"
                />{" "}
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />
        )}
      </>
      <Footer />
    </div>
  );
}

export default App;
