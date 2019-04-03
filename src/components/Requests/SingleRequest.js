import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { connect } from "react-redux";
import { getSingleCheckoutRequest } from "../../redux/actions/checkoutActions.js";
import ChatApp from "../Chat/ChatApp";
import { getLoggedInUser } from "../../redux/actions/authActions.js";

class SingleRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleCheckoutRequest: {}
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId")
    this.props.getSingleCheckoutRequest(userId, this.props.match.params.checkoutRequestId);
    this.props.getLoggedInUser();
  }

  render() {
    console.log("this.state", this.state);
    console.log("this.props", this.props);
    if (!this.props.singleCheckoutRequest) {
      return <h1>Loading...</h1>;
    }
      const {
        title,
        authors,
        borrower,
        borrowerId
      } = this.props.singleCheckoutRequest;
      return (
        <div>
            <h2>Talk to {borrower} about exchanging {title} by {authors}</h2>  
            <ChatApp user={this.props.loggedInUser} otherUserId={borrowerId}/>
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
)(SingleRequest);
