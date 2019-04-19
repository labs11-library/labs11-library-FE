import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { connect } from "react-redux";
import { getSingleCheckoutRequest } from "../../redux/actions/checkoutActions.js";
import ChatApp from "../Chat/ChatApp";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Auth from "../Auth/Auth";
import { Link } from "react-router-dom";
import {
  ChatWrapper,
  BackButtonWrapper,
  ChatButtonWrapper
} from "../Styles/ChatStyles";
import Button from "@material-ui/core/Button";
import Loading from "../Loading/Loading.js";
import baseUrl from "../../url";
import { deleteCheckoutRequest } from "../../redux/actions/checkoutActions.js";
import { withRouter } from "react-router-dom";
import DeleteRequest from "./DeleteRequest";

class SingleRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleCheckoutRequest: {},
      open: false
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

  deleteRequest = () => {
    const { lenderId, checkoutRequestId } = this.props.singleCheckoutRequest;
    this.props.deleteCheckoutRequest(lenderId, checkoutRequestId);
    this.sendEmail();
    this.props.history.push("/notifications");
  };

  sendEmail = () => {
    const {
      lenderEmail,
      lender,
      title,
      lenderId,
      borrowerEmail,
      borrower
    } = this.props.singleCheckoutRequest;
    const otherUserEmail =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrowerEmail
        : lenderEmail;
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;
    const borrowerLenderName =
      lenderId.toString() === localStorage.getItem("userId")
        ? lender
        : borrower;
    const anymoreText =
      lenderId.toString() === localStorage.getItem("userId")
        ? null
        : " anymore";
    localStorage.getItem("userId");
    const email = {
      recipient: otherUserEmail,
      sender: "blkfltchr@gmail.com",
      subject: `${borrowerLenderName} doesn't want to exchange ${title}${anymoreText}`,
      html: `Hey ${lenderBorrowerName}, unfortunately ${borrowerLenderName} does not want to exchange ${title}${anymoreText}. Find your next book on <a href="https://bookmaps.netlify.com/">BookMaps</a>!`
    };
    fetch(
      `${baseUrl}/send-email?recipient=${email.recipient}&sender=${
        email.sender
      }&topic=${email.subject}&html=${email.html}`
    ).catch(err => console.error(err));
    this.forceUpdate();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (
      this.props.loadingRequests ||
      this.props.singleCheckoutRequest.lenderId === undefined
    ) {
      return <Loading />;
    }
    const {
      title,
      borrower,
      borrowerId,
      lender,
      lenderId
    } = this.props.singleCheckoutRequest;
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;
    const otherUserId =
        lenderId.toString() === localStorage.getItem("userId")
          ? borrowerId
          : lenderId;
    return (
      <>
        <BackButtonWrapper>
          <Link to="/notifications" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="outlined">
              ← Back
            </Button>
          </Link>
        </BackButtonWrapper>
        <ChatWrapper>
          <ChatButtonWrapper>
            <Link to="/notifications" style={{ textDecoration: "none" }}>
              <Button color="primary" variant="outlined">
                ← Back
              </Button>
            </Link>
          </ChatButtonWrapper>
          {this.state.error ? (
            <h2>
              {lender} hasn't accepted your previous request yet. Talk to{" "}
              {borrower} about exchanging {title.substr(0, 25)}
              {title.length > 25 && "..."}
            </h2>
          ) : (
            <h2>
              Talk to {lenderBorrowerName} about exchanging{" "}
              {title.substr(0, 25)}
              {title.length > 25 && "..."}
            </h2>
          )}
          <ChatApp user={this.props.loggedInUser} otherUserId={otherUserId} />
          <Button
            style={{ margin: "10px 0" }}
            variant="outlined"
            color="secondary"
            onClick={this.handleClickOpen}
          >
            Delete request
          </Button>
          <DeleteRequest
            open={this.state.open}
            handleClose={this.handleClose}
            handleClickOpen={this.handleClickOpen}
            deleteRequest={this.deleteRequest}
            request={this.props.singleCheckoutRequest}
          />
        </ChatWrapper>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingRequests: state.checkoutReducer.fetchingSingleCheckoutRequest,
    singleCheckoutRequest: state.checkoutReducer.singleCheckoutRequest,
    loggedInUser: state.authReducer.loggedInUser,
    error: state.checkoutReducer.error
  };
};

export default connect(
  mapStateToProps,
  { getSingleCheckoutRequest, getLoggedInUser, deleteCheckoutRequest }
)(withRouter(Auth(SingleRequest)));
