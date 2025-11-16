import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";
import { coordinates, apikey } from "../../utils/constants";
import { getItems, postItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 36.9, C: 36.9 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    postItem(inputValues)
      .then((newItem) => {
        setClothingItems([...clothingItems, newItem]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apikey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const openConfirmationModal = () => {
    let card = selectedCard;
    setActiveModal("deleteConfirmation");
    return card;
  };

  const handleCardDelete = () => {
    let id = selectedCard._id;
    deleteItem(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeActiveModal();
        setSelectedCard({});
      })
      .catch(console.error);
  };

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeActiveModal();
    }
  };

  return (
    <div className="page">
      <BrowserRouter>
        <currentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    handleAddClick={handleAddClick}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
            </Routes>
            <>
              {activeModal === "add-garment" && (
                <AddItemModal
                  onClose={closeActiveModal}
                  isOpen={activeModal === "add-garment"}
                  onAddItem={onAddItem}
                  onOverlayClose={handleOverlayClose}
                  postItem={postItem}
                ></AddItemModal>
              )}
              {activeModal === "preview" && (
                <ItemModal
                  activeModal={activeModal}
                  card={selectedCard}
                  onClose={closeActiveModal}
                  onOverlayClose={handleOverlayClose}
                  onConfirm={openConfirmationModal}
                />
              )}
              {activeModal === "deleteConfirmation" && (
                <DeleteConfirmationModal
                  name="deleteConfirmation"
                  activeModal={activeModal}
                  onCardDelete={handleCardDelete}
                  onClose={closeActiveModal}
                  deleteItem={deleteItem}
                />
              )}
            </>
            <Footer />
          </div>
        </currentTemperatureUnitContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
