// import "./Profile/Profile.css";
import SideBar from "../SideBar/SideBar";

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-item">
        <ClotghingSection />
      </section>
    </div>
  );
}

export default Profile;
