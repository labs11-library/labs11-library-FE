import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// ===================== REDUX IMPORTS =========================
import { Provider } from "react-redux";
import store from "./redux/store.js";
// ===================== REACT ROUTER ==========================
import { BrowserRouter as Router } from "react-router-dom";
// ====================== Material UI ==========================
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009EE5",
      contrastText:"#FFF"
    },
    secondary: {
      main: "#ff5454"
    }
  },
  status: {
    danger: "orange"
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
