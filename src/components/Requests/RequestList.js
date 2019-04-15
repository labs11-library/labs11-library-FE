import React, { Component } from "react";
import RequestDetails from "./RequestDetails";
import { connect } from "react-redux";
import { getCheckoutRequests } from "../../redux/actions/checkoutActions.js";
import Auth from "../Auth/Auth";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Loading from "../Loading/Loading.js";
import { NoRequests } from "../Styles/NotificationStyles.js";
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
    if (
      newProps.deletingCheckout === true ||
      this.props.loadingCheckouts === true
    ) {
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
    if (
      this.props.loadingRequests ||
      this.props.deletingCheckout ||
      this.props.loadingCheckouts
    ) {
      return <Loading />;
    } else if (this.props.checkoutRequests) {
      return (
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
                  <NoRequests>
                    You have no incoming checkout requests.  Check out your <span onClick={() => {this.setState({value: 1})}}>outbound requests</span> or add a book <a href="/">here</a>.
                  </NoRequests>
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
                  <NoRequests>
                    You have no outbound checkout requests. Check out your <span onClick={() => {this.setState({value: 0})}}>incoming requests</span> or find a book <a href="/">here</a>.
                  </NoRequests>
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
      );
    }
  }
}

const mapStateToProps = state => ({
  loadingRequests: state.checkoutReducer.loadingRequests,
  checkoutRequests: state.checkoutReducer.checkoutRequests,
  deletingCheckout: state.checkoutReducer.deletingCheckout,
  loadingCheckouts: state.checkoutReducer.loadingCheckouts
});
export default connect(
  mapStateToProps,
  { getCheckoutRequests }
)(Auth(Requests));
