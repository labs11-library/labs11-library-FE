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
  ButtonContainer,
  BookDetailsContainer
} from "../Styles/NotificationStyles";
import {
  BookImgWrapper,
  BookImg,
  BookTextContainer
} from "../Styles/InventoryStyles";
import Button from "@material-ui/core/Button";

import { getLoggedInUser } from "../../redux/actions/authActions";
import { toast } from "react-toastify";
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
    const borrowerLenderName =
      lenderId.toString() === localStorage.getItem("userId")
        ? lender
        : borrower;
    const email = {
      recipient: otherUserEmail,
      sender: "blkfltchr@gmail.com",
      subject: `${borrowerLenderName} can't exchange ${title}`,
      html: `Hey ${lenderBorrowerName}, unfortunately ${borrowerLenderName} is unable to exchange ${title}. Find your next book on <a href="https://bookmaps.netlify.com/">Book Maps</a>!`
    };
    fetch(
      `${baseUrl}/send-email?recipient=${email.recipient}&sender=${
        email.sender
      }&topic=${email.subject}&html=${email.html}`
    ).catch(err => console.error(err));
    toast.info("Email notification sent!");
    this.forceUpdate();
  };

  render() {
    const {
      checkoutRequestId,
      title,
      authors,
      image,
      lenderId,
      borrower,
      lender,
      description
    } = this.props.request;
    const userId = localStorage.getItem("userId");
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;
    const lenderBorrower =
      lenderId.toString() === localStorage.getItem("userId")
        ? "Borrower"
        : "Lender";
    const descriptionText =
        description.length > 55
          ? `${description.substr(0, 55)} ...`
          : description;
    return (
      <BookDetailsWrapper>
        <BookDetailsContainer>
          <BookImgWrapper>
            <BookImg alt={title} src={image} />
          </BookImgWrapper>
          <BookTextContainer>
            <h2>
              {title.substr(0, 25)}
              {title.length > 25 && "..."}
            </h2>
            <p>by {authors}</p>
            <p>{description === ""
              ? "No description provided"
              : "Description: " + descriptionText}</p>
            <p>
              {lenderBorrower}: {lenderBorrowerName}
            </p>
          </BookTextContainer>
        </BookDetailsContainer>
        <ButtonContainer>
          <NavLink
              style={{ textDecoration: "none" }}
              to={`/notifications/${checkoutRequestId}`}
              >
          <Button
            style={{ margin: "10px 5px" }}
            variant="contained"
            color="primary"
            >
              Send Message
            </Button>
          </NavLink>
          {userId === lenderId.toString() && (
            <>
              <Button
                style={{ margin: "10px 5px" }}
                variant="outlined"
                color="primary"
                onClick={this.confirmCheckout}
              >
                Confirm transfer
              </Button>
            </>
          )}
          <Button
            style={{ margin: "10px 5px" }}
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
