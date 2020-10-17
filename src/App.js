import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Root from "./new_App";
import { Switch, BrowserRouter } from "react-router-dom"
import "./App.css";
import axios from "axios";
import { PROD_URL } from "./config/api";

function App() {
  axios.defaults.baseURL = PROD_URL;
  // axios.defaults.baseURL = "https://08ed948356fe.ngrok.io";
  return (
    <div className="App">
      <Provider store={store}>
        <Root />
      </Provider>
    </div>
  );
}

export default App;



