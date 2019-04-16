import React, { Component } from "react";
import * as moment from "moment";
import "@progress/kendo-theme-material/dist/all.css";
import { connect } from "react-redux";
import { getSingleCheckout } from "../../redux/actions/checkoutActions.js";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import ChatApp from "../Chat/ChatApp";
import baseUrl from "../../url";
import Auth from "../Auth/Auth";
import { ChatWrapper, BackButtonWrapper, ChatButtonWrapper } from "../Styles/ChatStyles";
import Loading from "../Loading/Loading.js";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
      borrower,
      checkoutId
    } = this.props.singleCheckout;
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
      subject: `${borrowerLenderName} wants to coordinate a return of ${title}`,
      html: `Hey ${lenderBorrowerName}, check out <a href="https://bookmaps.netlify.com/my-library/checkouts/${checkoutId}">this message thread</a> to coordinate a book return with ${borrowerLenderName}`
    };

    fetch(
      `${baseUrl}/send-email?recipient=${email.recipient}&sender=${
        email.sender
      }&topic=${email.subject}&html=${email.html}`
    ).catch(err => console.error(err));
    toast.info("Email notification sent!");
  };

  render() {
    if (!this.props.singleCheckout.lenderId) {
      // loadingCheckouts || this.props.loadingUser
      return <Loading />;
    } else {
      const {
        title,
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
        <>
          <BackButtonWrapper>
            <Link to="/my-library" style={{textDecoration: "none"}}>
              <Button 
                  color="primary" 
                  variant="outlined" 
                >← Back</Button>
            </Link>
          </BackButtonWrapper>
          <ChatWrapper>
            <ChatButtonWrapper>
              <Link to="/my-library" style={{textDecoration: "none"}}>
                <Button 
                    color="primary" 
                    variant="outlined" 
                  >← Back</Button>
              </Link>
            </ChatButtonWrapper>
            <h2>Talk to {lenderBorrowerName} about returning {title.substr(0, 25)}{title.length > 25 && "..."}</h2>
            <p>
              Due: {dateDue} ({this.timeRemaining(dueDate)} from now)
            </p>
            <ChatApp user={this.props.loggedInUser} otherUserId={otherUserId} />
        </ChatWrapper>
          {/* <Button onClick={this.sendEmail}>
            Send {lenderBorrowerName} an email notification
          </Button>{" "} */}
        </>
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
