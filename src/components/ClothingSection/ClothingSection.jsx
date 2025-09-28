// import "../ClothingSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothingSection({ handleCardClick }) {
  return (
    <div className="clothing-section">
      <div>
        <p>Your Items</p>
        <button>Add New</button>
      </div>
      <ul className="clothing-section__items">
        {defaultClothingItems.map((item) => {
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
