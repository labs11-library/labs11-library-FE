import React from "react";
import Loader from "react-loader-spinner";

import "./loading.css";
const Loading = props => {
  return (
    <div className="loader-container">
      <div className="spinner">
        <Loader type="Oval" color="#00BFFF" height={80} width={80} />
      </div>
    </div>
  );
};

export default Loading;
