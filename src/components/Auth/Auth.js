import React from "react";
import axios from "axios";
import baseUrl from "../../url";

import Login from "./Login";
// axios defaults and interceptors
axios.defaults.baseURL = `${baseUrl}`;
axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem("jwt");

    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("jwt");
      const notLoggedIn = (
        <React.Fragment>
          <h2
            style={{
              color: "#ff5454",
              fontSize: "2rem",
              margin: "0 auto 24px",
              textAlign: "center"
            }}
          >
            Unauthorized to view this page. Please log in to continue.
          </h2>
          <Login />
        </React.Fragment>
      );

      return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
    }
  };
}
