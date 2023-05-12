import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";

import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import React, { useState } from "react";
import Signup from "./Components/Signup";
import Mbd from "./Components/Mbd";
import Abt from "./Components/Abt";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <Navbar />
      <Alert alert={alert} />
      <NoteState>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />

            {/* <Route exact path="/login" element={<Login />} /> */}
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
            <Route
              exact
              path="/login"
              element={<Mbd showAlert={showAlert} />}
            />
            <Route exact path="/about" element={<Abt />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
