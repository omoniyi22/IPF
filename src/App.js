import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoot from "./AppRoot";
import "./App.css";
import axios from "axios";

function App() {
  // axios.defaults.baseURL = "https://ipf-backend.herokuapp.com";
  axios.defaults.baseURL = "https://6db5d714690f.ngrok.io";
  return (
    <div className="App">
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </div>
  );
}

export default App;
