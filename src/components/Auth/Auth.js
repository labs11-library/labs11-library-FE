import React from "react";
import axios from "axios";
import baseUrl from "../../url";

import Signup from "./Signup";
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
              fontSize: "1.5rem",
              margin: "0 auto 24px",
              textAlign: "center",
              width: "70%"
            }}
          >
            You have to be a member of BookMaps to access this feature. Please sign up or log in to continue.
          </h2>
          <Signup />
        </React.Fragment>
      );

      return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
    }
  };
}
