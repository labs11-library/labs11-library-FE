import React, { Component } from "react";
import RequestDetails from "./RequestDetails";
import { connect } from "react-redux";
import { getCheckoutRequests } from "../../redux/actions/checkoutActions.js";
import Auth from "../Auth/Auth";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Loading from "../Loading/Loading.js";
class Requests extends Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
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
    } else if (this.props.checkoutRequests) {
      return (
<<<<<<< HEAD
        <div style={{ margin: "5vw auto auto auto" }}>
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
=======
        <>
          <Paper style={{ width: "90%", margin: "0 auto 48px" }}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="fullWidth"
            >
              <Tab label="Incoming Requests" />
              <Tab label="Outbound Requests" />
            </Tabs>
          </Paper>
          {this.state.value === 0 ? (
            <div>
              <div>
                {this.filterIncomingRequests().length === 0 && (
                  <h1>You have no incoming checkout requests.</h1>
                )}
                {this.filterIncomingRequests().length > 0 &&
                  this.filterIncomingRequests().map(request => {
                    return (
                      <RequestDetails
                        key={request.checkoutRequestId}
                        request={request}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            <div>
              <div>
                {this.filterOutgoingRequests().length === 0 && (
                  <h1>You have no pending outbound checkout requests.</h1>
                )}
                {this.filterOutgoingRequests().length > 0 &&
                  this.filterOutgoingRequests().map(request => {
                    return (
                      <RequestDetails
                        key={request.checkoutRequestId}
                        request={request}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </>
>>>>>>> 0a0b660d67655ed4bf017302071713733713c935
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
