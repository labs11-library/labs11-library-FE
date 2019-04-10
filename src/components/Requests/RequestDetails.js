import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../url";
import {
  addCheckout,
  deleteCheckoutRequest
} from "../../redux/actions/checkoutActions.js";
import { connect } from "react-redux";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  ButtonContainer,
  RequestInfo,
  RequestDescription
} from "../Styles/NotificationStyles";
import Button from "@material-ui/core/Button";

import { getLoggedInUser } from "../../redux/actions/authActions";
class RequestDetails extends Component {
  state = {
    value: 0
  };
  componentDidMount() {
    this.props.getLoggedInUser();
  }
  deleteRequest = () => {
    const { lenderId, checkoutRequestId } = this.props.request;
    this.props.deleteCheckoutRequest(lenderId, checkoutRequestId);
    this.sendEmail();
  };

  confirmCheckout = () => {
    const { checkoutRequestId, bookId } = this.props.request;
    const userId = localStorage.getItem("userId");
    this.props.addCheckout(userId, checkoutRequestId);
    axios
      .put(`${baseUrl}/books/${bookId}`, { available: false })
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  };

  sendEmail = () => {
    const {
      lenderEmail,
      lender,
      title,
      lenderId,
      borrowerEmail,
      borrower
    } = this.props.request;
    const otherUserEmail =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrowerEmail
        : lenderEmail;
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;

    const email = {
      recipient: otherUserEmail,
      sender: "blkfltchr@gmail.com",
      subject: `${this.props.loggedInUser.firstName} can't exchange ${title}`,
      text: `Hey ${lenderBorrowerName}, unfortunately ${
        this.props.loggedInUser.firstName
      } is unable to exchange ${title}`
    };
    fetch(
      `${baseUrl}/send-email?recipient=${email.recipient}&sender=${
        email.sender
      }&topic=${email.subject}&text=${email.text}`
    ) //query string url
      .catch(err => console.error(err));
    this.forceUpdate();
  };

  render() {
    const {
      checkoutRequestId,
      title,
      authors,
      image,
      description,
      lenderId,
      borrower,
      borrowerId,
      lender
    } = this.props.request;
    const userId = localStorage.getItem("userId");
    const descriptionText =
      description.length > 55
        ? `${description.substr(0, 55)} ...`
        : description;
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;
    const lenderBorrower =
      lenderId.toString() === localStorage.getItem("userId")
        ? "Borrower"
        : "Lender";
    return (
      <BookDetailsWrapper>
        <BookImgWrapper>
          <BookImg alt={title} src={image} />
        </BookImgWrapper>
        <RequestInfo>
          <h2>
            {title.substr(0, 28)}
            {title.length > 28 && "..."}
          </h2>
          <p>by {authors}</p>
          <RequestDescription>
            {description === ""
              ? "No description provided"
              : "Description: " + descriptionText}
          </RequestDescription>
          <p>
            {lenderBorrower}: {lenderBorrowerName}
          </p>
        </RequestInfo>
        <ButtonContainer>
          {userId === lenderId.toString() && (
            <>
              <Button
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  margin: "10px auto",
                  padding: "6px 14px"
                }}
                variant="contained"
                color="primary"
                onClick={this.confirmCheckout}
              >
                Confirm book transfer
              </Button>
            </>
          )}
          <Button
            style={{
              width: "100%",
              minWidth: "140px",
              maxWidth: "180px",
              margin: "10px auto 10px",
              padding: "6px 14px"
            }}
            variant="outlined"
            color="primary"
          >
            <NavLink
              style={{ textDecoration: "none" }}
              to={`/notifications/${checkoutRequestId}`}
            >
              Send Message
            </NavLink>
          </Button>
          {/* The button below will DELETE by checkoutRequestId  */}
          <Button
            style={{
              width: "100%",
              maxWidth: "180px",
              minWidth: "140px",
              margin: "0px auto 10px",
              padding: "6px 14px"
            }}
            variant="outlined"
            color="secondary"
            onClick={this.deleteRequest}
          >
            Delete request
          </Button>
        </ButtonContainer>
      </BookDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.bookReducer.loadingCheckouts,
    loggedInUser: state.authReducer.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { addCheckout, getLoggedInUser, deleteCheckoutRequest }
)(RequestDetails);
