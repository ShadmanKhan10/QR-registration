import React, { useState } from "react";
import HomePage from "./HomePage";
import Terminal from "./Terminal";

function App() {
  const [terminlaSeclected, setTerminalSelected] = useState(false);
  return (
    <>
      {!terminlaSeclected ? (
        <Terminal
          terminlaSeclected={terminlaSeclected}
          setTerminalSelected={setTerminalSelected}
        />
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default App;
