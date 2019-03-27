import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// ===================== REDUX IMPORTS =========================
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./redux/reducers";
// ===================== REACT ROUTER ==========================
import { BrowserRouter as Router } from "react-router-dom";
// ===================== MAPBOX STYLESHEET ====================
import "mapbox-gl/dist/mapbox-gl.css";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
