import axios from "axios";
import React from "react";
import "./App.css";
import AppRoot from "./AppRoot";
import { PROD_URL } from "./config/api";

function App() {
  axios.defaults.baseURL = PROD_URL;
  return (
    <div className="App">
      <AppRoot />
    </div>
  );
}

export default App;
