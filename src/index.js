import React from 'react';
import ReactDOM from 'react-dom';
// import App from "./components/Event/App";
import { Switch } from 'react-router-dom'
import RootApp from "./App";
// import store from './components/Event/store/store'
import store from './redux/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <RootApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();