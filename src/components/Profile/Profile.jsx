import "../Profile/Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothingSection from "../ClothingSection/ClothingSection";

function Profile({ handleCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-item">
        <ClothingSection handleCardClick={handleCardClick} />
      </section>
    </div>
  );
}

export default Profile;
