import axios from "axios";
import React from "react";
<<<<<<< HEAD
import { Provider } from "react-redux";
import store from "./redux/store";
import Root from "./new_App";
import { Switch, BrowserRouter } from "react-router-dom"
=======
>>>>>>> 318e51e2744e3564d9526fe56f6f489a9fc561a8
import "./App.css";
import AppRoot from "./AppRoot";
import { PROD_URL } from "./config/api";

function App() {
  axios.defaults.baseURL = PROD_URL;
  return (
    <div className="App">
<<<<<<< HEAD
      <Provider store={store}>
        <Root />
      </Provider>
=======
      <AppRoot />
>>>>>>> 318e51e2744e3564d9526fe56f6f489a9fc561a8
    </div>
  );
}

export default App;



