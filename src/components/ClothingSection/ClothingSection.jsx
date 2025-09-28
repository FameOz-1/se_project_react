import "../ClothingItems/ClothingItems.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothingSection() {
  return (
    <div className="clothing-section">
      <div>
        <p className="clothing-section__items">Your Items</p>
        <button>Add New</button>
      </div>
      <ul className="clothing__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              // TODO - pass as prop
              // onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothingSection;
