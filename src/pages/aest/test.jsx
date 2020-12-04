import { connect } from 'react-redux'
import Test from './test'
const mapStateToProps = state => ({

})
export default connect(mapStateToProps)(Test)


// React is loaded and is available as React and ReactDOM
// imports should NOT be used
const List = ({items}) => {
  
  return (
    <ul>
    {items.map((item, key)=><li key={key}>{item}</li>)}
    </ul>
  );
}

document.body.innerHTML = "<div id='root'> </div>";
  
const rootElement = document.getElementById("root");
ReactDOM.render(
  <List items={["A", "B", "C"]} />
  , rootElement);

let listItem = document.querySelectorAll("li")[1];
if(listItem) {
  listItem.click();
}
setTimeout(() => console.log(document.getElementById("root").innerHTML));




import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { List } from './pages/aest/test'
import App from "./App";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );




document.body.innerHTML = "<div id='root'> </div>";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <List items={["A", "B", "C"]} />, rootElement
);

let listItem = document.querySelectorAll("li")[1];

if (listItem) {
  listItem.click();
}
setTimeout(() => console.log(document.getElementById("root").innerHTML));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();







// // React is loaded and is available as React and ReactDOM
// // imports should NOT be used
import React from 'react'
// import ReactDOM from "react-dom";



// class Tooltip extends React.Component {

//   render() {
//     // Write your code here
//     return null;
//   }
// }

// class App extends React.Component {
//   state = {
//     text: ''
//   }

//   onDocumentClick = (event) => {
//     if (event.target.tagName === 'BUTTON') {
//       this.setState({ text: event.target.textContent })
//     }
//   }

//   componentDidMount() {
//     document.addEventListener('click', this.onDocumentClick)
//   }
//   componentWillUnmount() {
//     document.removeEventListener('click', this.onDocumentClick)
//   }

//   render() {
//     return <div>
//       {this.props.children}
//       <Tooltip text={this.state.text} />
//     </div>
//   }
// }

// document.body.innerHTML = "<div id='root'></div><div id='tooltip'></div>";
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App>
//   <button id="button1">First button</button>
//   <button id="button2">Second button</button>
// </App>, rootElement);
// document.getElementById("button2").click();
// setTimeout(() => console.log(document.body.innerHTML));

// export default class Appp extends React.Component {
// render(){}
// }

// // React is loaded and is available as React and ReactDOM
// // imports should NOT be used
// const List = (props) => {
//   return  null;
// }

// document.body.innerHTML = "<div id='root'> </div>";

// const rootElement = document.getElementById("root");
// ReactDOM.render(<List items={["A", "B", "C"]} />, rootElement);

// let listItem = document.querySelectorAll("li")[1];
// if(listItem) {
//   listItem.click();
// }
// setTimeout(() => console.log(document.getElementById("root").innerHTML));


// React is loaded and is available as React and ReactDOM
// imports should NOT be used

export const List = (props) => {
  return null;
}

document.body.innerHTML = "<div id='root'> </div>";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <List items={["A", "B", "C"]} />, rootElement
);

let listItem = document.querySelectorAll("li")[1];

if (listItem) {
  listItem.click();
}
setTimeout(() => console.log(document.getElementById("root").innerHTML));
