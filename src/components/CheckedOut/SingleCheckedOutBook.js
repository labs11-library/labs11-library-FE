import React, { Component } from "react";
import * as moment from "moment";
import "@progress/kendo-theme-material/dist/all.css";
import { connect } from "react-redux";
import { getSingleCheckout } from "../../redux/actions/checkoutActions.js";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import ChatApp from "../Chat/ChatApp";
import { Button } from "@progress/kendo-react-buttons";
import baseUrl from "../../url";
import Auth from "../Auth/Auth";

import Loading from "../Loading/Loading.js";
class SingleCheckedOutBook extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getSingleCheckout(userId, this.props.match.params.checkoutId);
    this.props.getLoggedInUser();
  }

  timeRemaining = dueDate => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  };

  sendEmail = () => {
    const {
      lenderEmail,
      lender,
      title,
      lenderId,
      borrowerEmail,
      borrower
    } = this.props.singleCheckout;
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
      subject: `${
        this.props.loggedInUser.firstName
      } wants to coordinate a return of ${title}`,
      text: `Hey ${lenderBorrowerName}, check out bookmaps.app/notifications to coordinate a book return with ${
        this.props.loggedInUser.firstName
      }`
    };
    fetch(
      `${baseUrl}/send-email?recipient=${email.recipient}&sender=${
        email.sender
      }&topic=${email.subject}&text=${email.text}`
    ) //query string url
      .catch(err => console.error(err));
  };

  render() {
    if (!this.props.singleCheckout.lenderId) {
      // loadingCheckouts || this.props.loadingUser
      return <Loading />;
    } else {
      const {
        title,
        authors,
        lender,
        dueDate,
        lenderId,
        borrower,
        borrowerId
      } = this.props.singleCheckout;

      const dateDue = moment
        .utc(dueDate)
        .local()
        .format("dddd, MMMM Do");
      const lenderBorrowerName =
        lenderId.toString() === localStorage.getItem("userId")
          ? borrower
          : lender;
      const otherUserId =
        lenderId.toString() === localStorage.getItem("userId")
          ? borrowerId
          : lenderId;
      return (
        <div>
          <h2>
            Talk to {lenderBorrowerName} about returning {title} by {authors}
          </h2>
          <p>
            Due: {dateDue} ({this.timeRemaining(dueDate)} from now)
          </p>
          <Button onClick={this.sendEmail}>
            Send {lenderBorrowerName} an email notification
          </Button>{" "}
          <ChatApp user={this.props.loggedInUser} otherUserId={otherUserId} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loadingCheckouts: state.checkoutReducer.loadingCheckouts,
  loadingUser: state.authReducer.fetchingUser,
  singleCheckout: state.checkoutReducer.singleCheckout,
  loggedInUser: state.authReducer.loggedInUser
});

export default connect(
  mapStateToProps,
  { getSingleCheckout, getLoggedInUser }
)(Auth(SingleCheckedOutBook));
