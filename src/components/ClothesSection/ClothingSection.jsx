import ItemCard from "../ItemCard/ItemCard";
import "./ClothingSection.css";

function ClothingSection({ handleCardClick, handleAddClick, clothingItems }) {
  return (
    <div className="clothing-section">
      <div>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothing-section__add-item"
        >
          Add New
        </button>
        <p>Your Items</p>
      </div>
      <ul className="clothing-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothingSection;
