import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// ===================== REDUX IMPORTS =========================
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import store from "./redux/store.js";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import rootReducer from "./redux/reducers";
// ===================== REACT ROUTER ==========================
import { BrowserRouter as Router } from "react-router-dom";

// const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
