// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import homeIcon from "../../assets/home.png";
// import logoCheckIn from "../../assets/logoCheckIn.png";
// import smiley from "../../assets/smiley.png";
// import frowny from "../../assets/frowny.png";
// import homeButton from "../../assets/homeButton.png";
// import "./CheckIn.css";

// export default function CheckIn({ currentPage, setCurrentPage }) {
//   const [isQrScanned, setIsQrScanner] = useState(true);
//   const webcamRef = useRef(null);

//   const navigateBackHome = () => {
//     setCurrentPage("homePage");
//   };

//   return (
//     <>
//       <div className="home-icon-container">
//         <img
//           onClick={navigateBackHome}
//           className="home-icon"
//           src={homeIcon}
//           alt="home"
//         ></img>
//       </div>
//       <div>
//         <div className="check-in-logo-container">
//           <img className="logo-checkIn" src={logoCheckIn} alt="logo" />
//         </div>
//         {!isQrScanned && (
//           <div className="scanner-container">
//             <Webcam
//               mirrored={true}
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/webp"
//               className="webcam-preview"
//               videoConstraints="user"
//             />
//             <h1 className="scan-text">Please Scan your QR Code</h1>
//           </div>
//         )}
//         {isQrScanned && (
//           <div className="qr-success-container">
//             <div className="smiley-container">
//               <img className="smiley-img" src={smiley} alt="smiley" />
//             </div>
//             <p className="thank-you-text">THANK YOU</p>
//             <p className="name-text">Name</p>
//             <p className="company-text">Company Name</p>
//             <p className="success-text">Successfully Checked-In</p>
//             <div className="checkIn-home-btn-container">
//               <img
//                 onClick={navigateBackHome}
//                 src={homeButton}
//                 className="checkIn-home-btn"
//                 alt="home"
//               />
//             </div>
//           </div>
//         )}
//         {isQrScanned && (
//           <div className="qr-success-container">
//             <div className="smiley-container">
//               <img className="smiley-img" src={frowny} alt="frowny" />
//             </div>
//             <p className="oops-text">OOPS</p>
//             <div className="failure-text-container">
//               <p className="invalid-text">Invalid QR Code</p>
//               <p className="failure-text">Access Denied</p>
//             </div>
//             <div className="checkIn-home-btn-container">
//               <img
//                 onClick={navigateBackHome}
//                 src={homeButton}
//                 className="checkIn-home-btn"
//                 alt="home"
//               />
//             </div>
//           </div>
//         )}
//         <h1 className="scan-text">Please Scan your QR Code</h1>
//       </div>
//     </>
//   );
// }

//BEST APPROACH

// import React, { useRef, useState, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import jsQR from "jsqr";
// import homeIcon from "../../assets/home.png";
// import logoCheckIn from "../../assets/logoCheckIn.png";
// import smiley from "../../assets/smiley.png";
// import frowny from "../../assets/frowny.png";
// import homeButton from "../../assets/homeButton.png";
// import "./CheckIn.css";
// import axios from "axios";
// import { Scanner } from "@yudiel/react-qr-scanner";

// export default function CheckIn({ currentPage, setCurrentPage }) {
//   const [isQrScanned, setIsQrScanned] = useState(false);
//   const [qrStatus, setQrStatus] = useState(null);
//   const webcamRef = useRef(null);
//   const isScanned = useRef(false);

//   useEffect(() => {
//     processFrame();
//   }, []);
//   const navigateBackHome = () => {
//     setCurrentPage("homePage");
//   };

//   const processFrame = useCallback(() => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         decodeQRCode(imageSrc);
//       }
//     }
//     if (!isQrScanned) {
//       requestAnimationFrame(processFrame);
//     }
//   }, [isQrScanned]);

//   // useEffect(() => {
//   //   requestAnimationFrame(processFrame);

//   //   return () => setIsQrScanned(false);
//   // }, [processFrame]);

//   const sendQrRequest = async (userId) => {
//     try {
//       const response = await axios.post("http://192.168.1.6:3003/check-in", {
//         userId: userId,
//       });
//       console.log("Backend Response:", response.data);
//       console.log("success");
//       setQrStatus("success");
//     } catch (error) {
//       console.error("Error in sending POST request:", error);
//       setQrStatus("failure");
//     }
//   };

//   const decodeQRCode = (imageSrc) => {
//     if (!isScanned.current) {
//       const img = new Image();
//       img.src = imageSrc;
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         context.drawImage(img, 0, 0, canvas.width, canvas.height);

//         const imageData = context.getImageData(
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//         const code = jsQR(imageData.data, canvas.width, canvas.height);

//         if (code) {
//           console.log(code);
//           // setQrStatus("success");
//           console.log(code.data);
//           isScanned.current = true;
//           sendQrRequest(code.data);
//           setIsQrScanned(true);
//         }
//       };
//     }
//   };

//   return (
//     <>
//       <div className="home-icon-container">
//         <img
//           onClick={navigateBackHome}
//           className="home-icon"
//           src={homeIcon}
//           alt="home"
//         ></img>
//       </div>
//       <div>
//         <div className="check-in-logo-container">
//           <img className="logo-checkIn" src={logoCheckIn} alt="logo" />
//         </div>
//         {!isQrScanned && (
//           <div className="scanner-container">
//             {/* <Webcam
//               mirrored={true}
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/webp"
//               className="webcam-preview"
//               videoConstraints={{ facingMode: "environment" }}
//             /> */}
//             <div className="qr-scanner-container">
//               <Scanner onScan={(result) => console.log(result)} />
//             </div>
//             <h1 className="scan-text">Please Scan your QR Code</h1>
//           </div>
//         )}

//         {isQrScanned && qrStatus === "success" && (
//           <div className="qr-success-container">
//             <div className="smiley-container">
//               <img className="smiley-img" src={smiley} alt="smiley" />
//             </div>
//             <p className="thank-you-text">THANK YOU</p>
//             <p className="name-text">Name</p>
//             <p className="company-text">Company Name</p>
//             <p className="success-text">Successfully Checked-In</p>
//             <div className="checkIn-home-btn-container">
//               <img
//                 onClick={navigateBackHome}
//                 src={homeButton}
//                 className="checkIn-home-btn"
//                 alt="home"
//               />
//             </div>
//           </div>
//         )}

//         {/* Display Oops block if QR scan fails */}
//         {isQrScanned && qrStatus === "failure" && (
//           <div className="qr-failure-container">
//             <div className="smiley-container">
//               <img className="smiley-img" src={frowny} alt="frowny" />
//             </div>
//             <p className="oops-text">OOPS</p>
//             <div className="failure-text-container">
//               <p className="invalid-text">Invalid QR Code</p>
//               <p className="failure-text">Access Denied</p>
//             </div>
//             <div className="checkIn-home-btn-container">
//               <img
//                 onClick={navigateBackHome}
//                 src={homeButton}
//                 className="checkIn-home-btn"
//                 alt="home"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// //BEST APPRAOCH ENDS

import React, { useState, useEffect } from "react";
import homeIcon from "../../assets/home.png";
import logoCheckIn from "../../assets/logoCheckIn.png";
import smiley from "../../assets/smiley.png";
import frowny from "../../assets/frowny.png";
import straight from "../../assets/straight.png";
import homeButton from "../../assets/homeButton.png";
import "./CheckIn.css";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function CheckIn({ currentPage, setCurrentPage }) {
  const [isQrScanned, setIsQrScanned] = useState(false);
  const [qrStatus, setQrStatus] = useState(null);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [failureReaction, setFailureReaction] = useState("");
  const [activeDay, setActiveDay] = useState("");

  // Navigate back to the homepage
  const navigateBackHome = () => {
    setCurrentPage("homePage");
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

  // Send QR request to backend
  const sendQrRequest = async (userId) => {
    try {
      const response = await axios.post("http://192.168.1.36:3003/check-in", {
        userId: userId[0].rawValue,
        terminal_name: localStorage.getItem("selectedTerminal"),
        checkInDay: activeDay,
      });
      console.log("Backend Response:", response);
      console.log(response);
      console.log(userId[0].rawValue);
      if (response.status === 200) {
        setName(response.data.user.full_name);
        setCompanyName(response.data.user.company_name);
        setMessage(response.data.message);
        console.log(message);
        setQrStatus("success");
        setEmoji(smiley);
      }
    } catch (error) {
      console.error(
        "Error in sending POST request:",
        error.response.data.message
      );
      if (error.status === 409) {
        setMessage(error.response.data.message);
        setQrStatus("failure");
        setEmoji(straight);
        setFailureReaction("OH!");
      }
      if (error.status === 400) {
        setMessage(error.response.data.message);
        setQrStatus("failure");
        setEmoji(frowny);
        setFailureReaction("OOPS!");
      }
    }
  };

  // Handle QR code scan result
  const handleQrScan = (result) => {
    if (result) {
      console.log("Scanned QR Code:", result);
      sendQrRequest(result); // Send QR code data to the server
      setIsQrScanned(true); // Set QR scanned state
    }
  };

  // Handle scan errors
  const handleScanError = (error) => {
    console.error("Error during scan:", error);
    setQrStatus("failure");
    setIsQrScanned(true);
  };

  return (
    <>
      <div className="home-icon-container">
        <img
          onClick={navigateBackHome}
          className="home-icon"
          src={homeIcon}
          alt="home"
        />
      </div>

      <div>
        <div className="check-in-logo-container">
          <img className="logo-checkIn" src={logoCheckIn} alt="logo" />
        </div>

        {/* QR Scanner Section */}
        {!isQrScanned && (
          <div className="scanner-container">
            <div className="qr-scanner-container">
              <Scanner
                onScan={handleQrScan}
                onError={handleScanError}
                videoStyle={{ width: "100%" }}
              />
            </div>
            <h1 className="scan-text">Please Scan your QR Code</h1>
          </div>
        )}

        {/* Success Block */}
        {isQrScanned && qrStatus === "success" && (
          <div className="qr-success-container">
            <div className="smiley-container">
              <img className="smiley-img" src={emoji} alt="smiley" />
            </div>
            <p className="thank-you-text">THANK YOU</p>
            <p className="name-text">{name}</p>
            <p className="company-text">{companyName}</p>
            <p className="success-text">{message}</p>
            <div className="checkIn-home-btn-container">
              <img
                onClick={navigateBackHome}
                src={homeButton}
                className="checkIn-home-btn"
                alt="home"
              />
            </div>
          </div>
        )}

        {/* Failure Block */}
        {isQrScanned && qrStatus === "failure" && (
          <div className="qr-failure-container">
            <div className="smiley-container">
              <img className="smiley-img" src={emoji} alt="frowny" />
            </div>
            <p className="oops-text">{failureReaction}</p>
            <div className="failure-text-container">
              <p className="invalid-text">{message}</p>
              <p
                className={
                  emoji === straight ? "failure-text1" : "failure-text"
                }
              >
                {emoji === straight ? "Contact Support" : "Access Denied"}
              </p>
            </div>
            <div className="checkIn-home-btn-container">
              <img
                onClick={navigateBackHome}
                src={homeButton}
                className="checkIn-home-btn"
                alt="home"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
