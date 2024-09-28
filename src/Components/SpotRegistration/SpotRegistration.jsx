import React, { useState, useEffect } from "react";
import "./SpotRegistration.css";
import nameIcon from "../../assets/name.png";
import CompanyIcon from "../../assets/CompanyLogo.png";
import mobileIcon from "../../assets/mobile.png";
import homeIcon from "../../assets/home.png";
import designation from "../../assets/designation.png";
import email from "../../assets/email.png";
import submitButton from "../../assets/submitButton.png";
import logoSpotRegistration from "../../assets/logoCheckIn.png";
import SpotRegistrationSuccess from "./SpotRegistrationSuccess";
import axios from "axios";

export default function SpotRegistration({ currentPage, setCurrentPage }) {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designationName, setDesignationName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const [success, setSuccess] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [designationError, setDesignationError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeDay, setActiveDay] = useState("");

  useEffect(() => {
    if (!success) {
      setName("");
      setMobileNo("");
      setCompanyName("");
      setDesignationName("");
      setEmailAddress("");
    }
  }, [success]);

  const navigateBackHome = () => {
    setCurrentPage("homePage");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };

  // const handleMobileNoChange = (event) => {
  //   const value = event.target.value;
  //   if (/^\d{0,10}$/.test(value)) {
  //     setMobileNo(value);
  //     if (value.length < 10) {
  //       setMobileError(true);
  //     } else {
  //       setMobileError(false);
  //     }
  //   }
  // };
  const handleMobileNoChange = (event) => {
    setMobileNo(event.target.value);
    setMobileError(false);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
    setCompanyError(false);
  };

  const handleDesignationChange = (event) => {
    setDesignationName(event.target.value);
    setDesignationError(false);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmailAddress(value);
    setEmailError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const validateInputs = () => {
    let isValid = true;

    if (name === "") {
      setNameError(true);
      isValid = false;
    }

    // if (!/^\d{10}$/.test(mobileNo)) {
    //   setMobileError(true);
    //   isValid = false;
    // }
    if (mobileNo === "") {
      setMobileError(true);
      isValid = false;
    }
    if (companyName === "") {
      setCompanyError(true);
      isValid = false;
    }

    if (designationName === "") {
      setDesignationError(true);
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setEmailError(true);
      isValid = false;
    }

    return isValid;
  };

  const getActiveDay = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.36:3003/get-active-day"
      );
      console.log(response.data.activeDay.day);
      setActiveDay(response.data.activeDay.day);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getActiveDay();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNameError(false);
    setMobileError(false);
    setCompanyError(false);
    setDesignationError(false);
    setEmailError(false);

    if (validateInputs()) {
      const newParticipant = {
        full_name: name,
        mobile: mobileNo,
        company_name: companyName,
        designation: designationName,
        email: emailAddress,
        active_day: activeDay,
        terminal_name: localStorage.getItem("selectedTerminal"),
      };
      setLoading(true);
      try {
        const response = await axios.post(
          "http://192.168.1.36:3003/register-user",
          newParticipant
        );
        console.log("Participant added:", response.data);
        setSuccess(true);
        console.log(response.status);
        setLoading(false);
      } catch (error) {
        console.log("Error here", error);
        if (error.response.status === 409) {
          setLoading(false);
        }
      }
    }
  };

  return (
    <>
      {loading && (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      )}
      {!success && (
        <div>
          <div className="spot-registration-logo-container">
            <img
              className="spot-registration-logo"
              src={logoSpotRegistration}
              alt="logo"
            />
          </div>
          <p className="registration-text">
            Please enter your details to register for
          </p>
          <p className="registration-text-normal">Digital Health Summit</p>
          <form onSubmit={handleSubmit}>
            <div className="inputs-fields-container">
              <div className="input-container">
                <div className="icon-container">
                  <img className="icon" src={nameIcon} alt="icon" />
                </div>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Full Name*"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              {nameError && (
                <div className="error-container">
                  <p className="error">Enter your name</p>
                </div>
              )}
              <div className="input-container">
                <div className="icon-container">
                  <img className="icon" src={mobileIcon} alt="icon" />
                </div>
                <input
                  className="input-field"
                  type="number"
                  placeholder="Mobile Number*"
                  value={mobileNo}
                  onChange={handleMobileNoChange}
                  required
                />
              </div>
              {mobileError && (
                <div className="error-container">
                  <p className="error">Enter your Mobile Number</p>
                </div>
              )}
              <div className="input-container">
                <div className="icon-container">
                  <img className="icon" src={CompanyIcon} alt="icon" />
                </div>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Company Name*"
                  value={companyName}
                  onChange={handleCompanyNameChange}
                  required
                />
              </div>
              {companyError && (
                <div className="error-container">
                  <p className="error">Enter your company</p>
                </div>
              )}
              <div className="input-container">
                <div className="icon-container">
                  <img className="icon" src={designation} alt="icon" />
                </div>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Designation*"
                  value={designationName}
                  onChange={handleDesignationChange}
                  required
                />
              </div>
              {designationError && (
                <div className="error-container">
                  <p className="error">Enter your Designation</p>
                </div>
              )}
              <div className="input-container">
                <div className="icon-container">
                  <img className="icon" src={email} alt="icon" />
                </div>
                <input
                  className="input-field"
                  type="text"
                  placeholder="E-mail Address*"
                  value={emailAddress}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              {emailError && (
                <div className="error-container">
                  <p className="error">Enter a valid E-mail</p>
                </div>
              )}
            </div>
            <div className="button-container">
              <img
                src={submitButton}
                className="submit-btn"
                onClick={handleSubmit}
                alt="submit"
              />
            </div>
          </form>

          <div className="home-icon-container">
            <img
              onClick={navigateBackHome}
              className="home-icon"
              src={homeIcon}
              alt="home"
            ></img>
          </div>
        </div>
      )}
      {success && (
        <SpotRegistrationSuccess
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          name={name}
          companyName={companyName}
        />
      )}
    </>
  );
}
