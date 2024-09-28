import React, { useEffect, useState } from "react";
import "./Terminal.css";
import logo from "./assets/logo.png";
import axios from "axios";

export default function Terminal({ terminlaSeclected, setTerminalSelected }) {
  const handleTerminalClick = (terminalName) => {
    setTerminalSelected(true);
    localStorage.setItem("selectedTerminal", terminalName);
    console.log("Selected Terminal: ", terminalName);
  };
  const [list, setList] = useState([]);
  const terminalList = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.36:3003/get-terminals"
      );
      setList(response.data.terminals);
    } catch (error) {
      console.error("Error fetching terminal data", error);
    }
  };
  useEffect(() => {
    terminalList();
  }, []);
  return (
    <>
      <div className="main-logo-container">
        <img className="main-logo" src={logo} alt="logo" />
      </div>
      <div className="terminal-dropdown-container">
        <select
          className="dropDowns"
          onChange={(e) => handleTerminalClick(e.target.value)}
        >
          {" "}
          <option className="dropdown-options">Select a Terminal</option>
          {list.map((terminal, index) => (
            <option
              key={index}
              className="dropdown-options"
              value={terminal.terminal_name}
              //   onClick={handleTerminlaClick}
            >
              {terminal.terminal_name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
