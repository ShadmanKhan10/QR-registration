import React from "react";
import logoSpotRegistration from "../../assets/logoCheckIn.png";
import homeButton from "../../assets/homeButton.png";
import "./SpotRegistrationSuccess.css";

export default function SpotRegistrationSuccess({
  setCurrentPage,
  name,
  companyName,
}) {
  const navigateBackHome = () => {
    setCurrentPage("homePage");
  };

  return (
    <div>
      <div className="spot-registration-logo-container">
        <img
          className="spot-registration-logo"
          src={logoSpotRegistration}
          alt="logo"
        />
      </div>
      <div className="thankyou-content-spot-registration">
        <h1 className="thank-you-text">THANK YOU</h1>
        <p className="name-text">{name}</p>
        <p className="company-text">{companyName}</p>
        {/* <div className="qr-preview-container"></div> */}
        <p className="success-text">Successfully Registered</p>
      </div>
      <div className="checkIn-home-btn-container">
        {/* <button onClick={navigateBackHome} className="checkIn-home-btn">
          HOME
        </button> */}
        <img
          src={homeButton}
          onClick={navigateBackHome}
          className="checkIn-home-btn"
          alt="home"
        />
      </div>
    </div>
  );
}
