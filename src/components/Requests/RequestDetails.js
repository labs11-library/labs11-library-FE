import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../url";
import { addCheckout } from "../../redux/actions/checkoutActions.js";
import { connect } from "react-redux";
import { BookDetailsWrapper, BookImgWrapper, BookImg } from "../Books/styles";
import { getLoggedInUser } from "../../redux/actions/authActions";
class RequestDetails extends Component {
  componentDidMount() {
    this.props.getLoggedInUser();
  }

  deleteRequest = () => {
    const { lenderId, checkoutRequestId } = this.props.request;
    axios
      .delete(
        `${baseUrl}/users/${lenderId}/checkoutrequest/${checkoutRequestId}`
      )
      .then(res => {
        // window.location.reload();
        return res.data;
      })
      .catch(err => console.log(err));
    this.sendEmail();
    // window.location.reload();
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

    // window.location.reload();

    // axios
    //   .put(`${baseUrl}/users/${userId}/checkoutRequest/${checkoutRequestId}`, { checkoutAccepted: true })
    //   .then(res => {
    //     return res.data;
    //   })
    // .catch(err => console.log(err));
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
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;
    return (
      <BookDetailsWrapper>
        <BookImgWrapper>
          <BookImg alt={title} src={image} />
        </BookImgWrapper>
        <div>
          <h2>{title}</h2>
          <p>by {authors}</p>
          <div>Description: {description}</div>
          <div>Borrower: {borrower}</div>
          <p>Contact {lenderBorrowerName} to arrange a book exchange</p>
          <Link to={`/notifications/${checkoutRequestId}`}>
            <Button>Send Message</Button>
          </Link>
          {/* The button below will DELETE by checkoutRequestId  */}
          <Button onClick={this.deleteRequest}>Delete request</Button>
          {userId === lenderId.toString() && (
            <>
              <Button onClick={this.confirmCheckout}>
                Confirm book transfer
              </Button>
            </>
          )}
        </div>
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
  { addCheckout, getLoggedInUser }
)(RequestDetails);

// export default withRouter(RequestDetailsRedux);
