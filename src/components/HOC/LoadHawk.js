import React from "react";

const LoadHawk = (loadingProp, Component) => {
  class WithLoading extends React.Component {
    render() {
      if (loadingProp) {
        return <h2>Loading...</h2>;
      } else {
        return <Component {...this.props} />;
      }
    }
  }
  return WithLoading;
};

export default LoadHawk;
