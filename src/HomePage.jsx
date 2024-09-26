import React, { useState } from "react";
import "./HomePage.css";
import logo from "./assets/logo.png";
import CheckIn from "./Components/CheckIn/CheckIn";
import SpotRegistration from "./Components/SpotRegistration/SpotRegistration";
import checkInButton from "./assets/checkInButton.png";
import onSpotButton from "./assets/onSpotButton.png";

export default function HomePage() {
  //   const [checkIn, setCheckIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("homePage");

  const navigateToCheckIn = () => {
    setCurrentPage("checkInPage");
  };
  const navigateToSpotRegistration = () => {
    setCurrentPage("spotRegistration");
  };

  return (
    <>
      {currentPage === "homePage" && (
        <div>
          <div className="main-logo-container">
            <img className="main-logo" src={logo} alt="logo" />
          </div>
          <p className="welcome-text">
            Welcome! Ready to get started? Choose to
          </p>
          <div className="check-in-btn-container">
            {/* <button onClick={navigateToCheckIn} className="check-in-btn">
              CHECK-IN
            </button> */}
            <img
              onClick={navigateToCheckIn}
              className="check-in-btn"
              src={checkInButton}
              alt="checkIn"
            />
          </div>
          <p className="or-text">or</p>
          <div className="spot-registration-btn-container">
            {/* <button
              onClick={navigateToSpotRegistration}
              className="spot-registration-btn"
            >
              ON SPOT REGISTRATION
            </button> */}
            <img
              onClick={navigateToSpotRegistration}
              className="spot-registration-btn"
              src={onSpotButton}
              alt="spot-registration"
            />
          </div>
        </div>
      )}
      {currentPage === "checkInPage" && (
        <CheckIn currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "spotRegistration" && (
        <SpotRegistration
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}
