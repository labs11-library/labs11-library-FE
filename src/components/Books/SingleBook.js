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
  Availability,
  BookButtonsWrapper,
  BookInfoWrapper,
  MapWrapper,
  BookCardWrapper,
  BookWrapper
} from "./styles";
import Auth from "../Auth/Auth";
import Payment from "../Stripe/Payment.js";
import SingleBookMapview from "./SingleBookMapview";

import Loading from "../Loading/Loading.js";
import { toast } from "react-toastify";
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
      html: `Hey ${lender}, check out <a href="https://bookmaps.netlify.com/notifications">your notifications</a> on Book Maps to coordinate an exchange with ${
        this.props.loggedInUser.firstName
      }!`
    };
    fetch(
      `${baseUrl}/send-email?recipient=${email.recipient}&sender=${
        email.sender
      }&topic=${email.subject}&html=${email.html}`
    ).catch(err => console.error(err));
    toast.info(`Email notification sent to ${lender}.`);
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
        dueDate,
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
      // const threeWeeks = moment(checkoutDate, "YYYY-MM-DD").add(21, "days");

      const dateDue = moment
        .utc(dueDate)
        .local()
        .format("dddd, MMMM Do");

      return (
        <div>
          <Link style={{ position: "absolute", left: "0" }} to={"/"}>
            <Button variant="outlined">← Back to Bookmaps</Button>
          </Link>
          <Link
            style={{ position: "absolute", right: "0" }}
            to={`/users/${lenderId}/library`}
          >
            <Button variant="outlined">Visit {lender}'s Library →</Button>
          </Link>
          <BookDetailsWrapper>
            <BookCardWrapper>
              <BookWrapper>
                <BookImgWrapper>
                  <BookImg alt={title} src={image} />
                </BookImgWrapper>
                <BookInfoWrapper>
                  <h2>{title}</h2>
                  <p>by {authors}</p>
                  <Availability available={available}>
                    {availability}
                  </Availability>
                  {/* {!available && <p>Time until due: {timeRemaining(dueDate)}</p>} */}
                  {!available && (
                    <p>
                      Date due:
                      {dateDue}
                    </p>
                  )}
                  {avgRating && (
                    <div>
                      <Ratings rating={avgRating} widgetRatedColors="gold">
                        <Ratings.Widget
                          widgetHoverColor="gold"
                          widgetDimension="30px"
                        />
                        <Ratings.Widget
                          widgetHoverColor="gold"
                          widgetDimension="30px"
                        />
                        <Ratings.Widget
                          widgetHoverColor="gold"
                          widgetDimension="30px"
                        />
                        <Ratings.Widget
                          widgetHoverColor="gold"
                          widgetDimension="30px"
                        />
                        <Ratings.Widget
                          widgetHoverColor="gold"
                          widgetDimension="30px"
                        />
                      </Ratings>
                      <div>Goodreads rating: {avgRating}</div>
                    </div>
                  )}
                </BookInfoWrapper>
              </BookWrapper>
              <BookButtonsWrapper>
                <p>
                  {description === ""
                    ? "No description provided"
                    : `Description: ${description}`}
                </p>
                {this.props.loggedInUser.stripe_email === null && (
                  <div>
                    <p>Contact {lender}</p>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled
                      onClick={() => this.requestCheckout(bookId, lenderId)}
                    >
                      Request checkout
                    </Button>
                    <div>
                      <i>
                        Please enter your payment information before requesting
                        checkout
                      </i>
                    </div>
                    <Payment />
                  </div>
                )}
                {this.props.loggedInUser.stripe_email && (
                  <div>
                    <p>Contact {lender}</p>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.requestCheckout(bookId, lenderId)}
                    >
                      Request checkout
                    </Button>
                  </div>
                )}
              </BookButtonsWrapper>
            </BookCardWrapper>
            <MapWrapper value={this.state.value}>
              <SingleBookMapview />
            </MapWrapper>
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
