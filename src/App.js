import React from 'react';
import { Provider } from "react-redux";
import store from './redux/store'
import AppRoot from './AppRoot'
import './App.css'
import axios from "axios";


function App() {
  axios.defaults.baseURL = 'https://ipf-backend.herokuapp.com';
  return (
    <div className="App">
      <Provider store={store}>
          <AppRoot />
      </Provider>
    </div>
  );
}

export default App;
