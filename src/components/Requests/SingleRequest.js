import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { connect } from "react-redux";
import { getSingleCheckoutRequest } from "../../redux/actions/checkoutActions.js";
import ChatApp from "../Chat/ChatApp";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Auth from "../Auth/Auth";

import Loading from "../Loading/Loading.js";
class SingleRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleCheckoutRequest: {}
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getSingleCheckoutRequest(
      userId,
      this.props.match.params.checkoutRequestId
    );
    this.props.getLoggedInUser();
  }

  render() {
    if (!this.props.singleCheckoutRequest) {
      return <Loading />;
    }
    const {
      title,
      authors,
      borrower,
      borrowerId
    } = this.props.singleCheckoutRequest;
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>
          Talk to {borrower} about exchanging {title} by {authors}
        </h2>
        <ChatApp user={this.props.loggedInUser} otherUserId={borrowerId} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingRequests: state.checkoutReducer.fetchingSingleCheckoutRequest,
    singleCheckoutRequest: state.checkoutReducer.singleCheckoutRequest,
    loggedInUser: state.authReducer.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { getSingleCheckoutRequest, getLoggedInUser }
)(Auth(SingleRequest));
