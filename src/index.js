import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer, { intialState } from "./statemangement/reducer";
import { StateProvider } from "./statemangement/statemangement";
ReactDOM.render(
  <StateProvider initialState={intialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
