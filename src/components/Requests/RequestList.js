import React, { Component } from "react";
import RequestDetails from "./RequestDetails";
import { connect } from "react-redux";
import { getCheckoutRequests } from "../../redux/actions/checkoutActions.js";

class Requests extends Component {
  constructor() {
    super();
    this.state = {
      checkoutRequests: []
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.checkoutRequests !== this.state.checkoutRequests) {
      this.setState({
        checkoutRequests: this.props.checkoutRequests
      });
    }
  }
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getCheckoutRequests(userId);
    // this.setState({
    //   checkoutRequests: this.props.checkoutRequests
    // })
  }

  filterRequests = () => {
    return this.props.checkoutRequests.filter(
      request => request.checkoutAccepted === false
    );
  };

  filterIncomingRequests = () => {
    let userId = localStorage.getItem("userId");
    return this.props.checkoutRequests.filter(
      request => request.lenderId === userId
    );
  };

  filterOutgoingRequests = () => {
    let userId = localStorage.getItem("userId");
    return this.props.checkoutRequests.filter(
      request => request.lenderId !== userId
    );
  };

  render() {
    console.log("/books this.props", this.props);
    console.log("/books this.state", this.state);
    if (this.props.loadingRequests) {
      return <h1>Loading...</h1>;
    } else if (this.props.checkoutRequests.length === 0) {
      return <h1>You have no checkout requests.</h1>;
    } else if (this.props.checkoutRequests) {
      return (
        <div>
          <h1>Pending checkouts</h1>
          <div>
            {this.props.checkoutRequests.map(request => {
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
  checkoutRequests: state.checkoutReducer.checkoutRequests
});
export default connect(
  mapStateToProps,
  { getCheckoutRequests }
)(Requests);
