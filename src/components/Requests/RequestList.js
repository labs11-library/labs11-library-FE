import React, { Component } from "react";
import RequestDetails from "./RequestDetails";
import { connect } from "react-redux";
import { getCheckoutRequests } from "../../redux/actions/checkoutActions.js";
import Auth from "../Auth/Auth";

import Loading from "../Loading/Loading.js";
class Requests extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.deletingCheckout === true) {
      const userId = localStorage.getItem("userId");
      this.props.getCheckoutRequests(userId);
    }
  }
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getCheckoutRequests(userId);
  }

  filterRequests = () => {
    return this.props.checkoutRequests.filter(
      request => request.checkoutAccepted === false
    );
  };

  filterIncomingRequests = () => {
    let userId = localStorage.getItem("userId");
    return this.props.checkoutRequests.filter(
      request =>
        request.lenderId.toString() === userId &&
        request.checkoutAccepted === false
    );
  };

  filterOutgoingRequests = () => {
    let userId = localStorage.getItem("userId");
    return this.props.checkoutRequests.filter(
      request =>
        request.borrowerId.toString() === userId &&
        request.checkoutAccepted === false
    );
  };

  render() {
    if (this.props.loadingRequests || this.props.deletingCheckout) {
      return <Loading />;
    } else if (this.props.checkoutRequests.length === 0) {
      return <h1>You have no checkout requests.</h1>;
    } else if (this.props.checkoutRequests) {
      return (
        <div>
          <h1>Incoming Requests</h1>
          <div>
            {this.filterIncomingRequests().map(request => {
              return (
                <RequestDetails
                  key={request.checkoutRequestId}
                  request={request}
                />
              );
            })}
          </div>
          <h1>Outbound Requests</h1>
          <div>
            {this.filterOutgoingRequests().map(request => {
              return (
                <RequestDetails
                  key={request.checkoutRequestId}
                  request={request}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loadingRequests: state.checkoutReducer.loadingRequests,
  checkoutRequests: state.checkoutReducer.checkoutRequests,
  deletingCheckout: state.checkoutReducer.deletingCheckout
});
export default connect(
  mapStateToProps,
  { getCheckoutRequests }
)(Auth(Requests));
