import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// ===================== REDUX IMPORTS =========================
import { Provider } from "react-redux";
import store from "./redux/store.js";
// ===================== REACT ROUTER ==========================
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
