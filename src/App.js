import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoot from "./AppRoot";
import "./App.css";
import axios from "axios";
import { PROD_URL } from "./config/api";

function App() {
  axios.defaults.baseURL = PROD_URL;

  return (
    <div className="App">
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </div>
  );
}

export default App;
