import React, { Component } from "react";
import * as moment from "moment";
import "@progress/kendo-theme-material/dist/all.css";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { getSingleBook } from "../../redux/actions/bookActions.js";
import Ratings from "react-ratings-declarative";
import ChatApp from "../Chat/ChatApp";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import { addCheckoutRequest } from "../../redux/actions/checkoutActions.js";
import { Link } from "react-router-dom";
import baseUrl from "../../url";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  Availability
} from "./styles";
import Auth from "../Auth/Auth";
import Payment from "../Stripe/Payment.js";

import Loading from "../Loading/Loading.js";
class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChat: false
    };
  }

  componentDidMount() {
    this.props.getSingleBook(this.props.match.params.bookId);
    this.props.getLoggedInUser();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.creatingStripe === true) {
      this.props.getLoggedInUser();
    }
  }
  exitChat = () => {
    this.setState({
      showChat: false
    });
  };

  sendEmail = () => {
    const { lenderEmail, lender, title } = this.props.singleBook;
    const email = {
      recipient: lenderEmail,
      sender: "blkfltchr@gmail.com",
      subject: `${
        this.props.loggedInUser.firstName
      } wants to checkout ${title}`,
      text: `Hey ${lender}, check out bookmaps.app/notifications to coordinate an exchange with ${
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

  requestCheckout = (bookId, lenderId) => {
    this.props.addCheckoutRequest(bookId, lenderId);
    this.sendEmail();
    this.setState({
      showChat: true
    });
  };

  render() {
    if (this.props.fetchingBooks || this.props.creatingStripe) {
      return <Loading />;
    } else if (!this.props.loading && this.state.showChat === false) {
      const {
        bookId,
        lenderId,
        title,
        authors,
        image,
        lender,
        avgRating,
        available,
        // dueDate,
        description,
        checkoutDate
      } = this.props.singleBook;
      const availability = available ? "Available" : "Checked out";
      // function timeRemaining(dueDate) {
      //   let now = moment(Date.now());
      //   let end = moment(dueDate);
      //   let duration = moment.duration(now.diff(end)).humanize();
      //   return duration;
      // }
      const threeWeeks = moment(checkoutDate, "YYYY-MM-DD").add(21, "days");
      const dueDate = moment
        .utc(threeWeeks)
        .local()
        .format("dddd, MMMM Do");
      return (
        <div>
          <BookDetailsWrapper>
            <Link
              style={{ position: "absolute", left: "0" }}
              to={`/users/${lenderId}/library`}
            >
              <Button>← Visit {lender}'s Library</Button>
            </Link>
            <BookImgWrapper>
              <BookImg alt={title} src={image} />
            </BookImgWrapper>
            <div>
              <h2>{title}</h2>
              <p>by {authors}</p>
              <Availability available={available}>{availability}</Availability>
              {/* {!available && <p>Time until due: {timeRemaining(dueDate)}</p>} */}
              {!available && checkoutDate && <p>Date due: {dueDate}</p>}{" "}
              <p>
                {description === ""
                  ? "No description provided"
                  : `Description: ${description}`}
              </p>
              {this.props.loggedInUser.stripe_email === null && (
                <div>
                  <i>
                    Please enter your payment information before requesting
                    checkout
                  </i>
                  <Payment />
                  <p>Contact {lender}</p>
                  <Button
                    disabled
                    variant="outlined"
                    onClick={() => this.requestCheckout(bookId, lenderId)}
                    color="primary"
                  >
                    Request checkout
                  </Button>
                </div>
              )}
              {this.props.loggedInUser.stripe_email && (
                <div>
                  <p>Contact {lender}</p>
                  <Button
                    variant="outlined"
                    onClick={() => this.requestCheckout(bookId, lenderId)}
                    color="primary"
                  >
                    Request checkout
                  </Button>
                </div>
              )}
              {avgRating && (
                <div>
                  <Ratings rating={avgRating} widgetRatedColors="gold">
                    <Ratings.Widget widgetHoverColor="gold" />
                    <Ratings.Widget widgetHoverColor="gold" />
                    <Ratings.Widget widgetHoverColor="gold" />
                    <Ratings.Widget widgetHoverColor="gold" />
                    <Ratings.Widget widgetHoverColor="gold" />
                  </Ratings>
                  <div>Goodreads rating: {avgRating}</div>
                </div>
              )}
            </div>
          </BookDetailsWrapper>
        </div>
      );
    } else {
      return (
        <div>
          <ChatApp
            user={this.props.loggedInUser}
            otherUserId={this.props.singleBook.lenderId}
            exitChat={this.exitChat}
          />
          {/*
          <Button onClick={() => this.setState({ showChat: false })}>
            Go back
          </Button> */}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    fetchingBooks: state.bookReducer.fetchingBooks,
    singleBook: state.bookReducer.singleBook,
    loggedInUser: state.authReducer.loggedInUser,
    fetchingUser: state.authReducer.fetchingUser,
    creatingStripe: state.authReducer.creatingStripe
  };
};

export default connect(
  mapStateToProps,
  { getSingleBook, getLoggedInUser, addCheckoutRequest }
)(Auth(SingleBook));
