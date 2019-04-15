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
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Avatar from "@material-ui/core/Avatar";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  Availability,
  BookButtonsWrapper,
  BookInfoWrapper,
  MapWrapper,
  BookCardWrapper,
  BookWrapper,
  TabsWrapper,
  LinkContainer,
  AvatarWrapper
} from "./styles";
import Auth from "../Auth/Auth";
import Payment from "../Stripe/Payment.js";
import SingleBookMapview from "./SingleBookMapview";
import {
  ChatWrapper,
  BackButtonWrapper,
  ChatButtonWrapper
} from "../Styles/ChatStyles";
import Loading from "../Loading/Loading.js";
import { toast } from "react-toastify";
class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChat: false,
      value: 0
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
  handleChange = (event, value) => {
    this.setState({ value });
  };
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
      html: `Hey ${lender}, check out <a href="https://bookmaps.netlify.com/notifications">your notifications</a> on Bookmaps to coordinate an exchange with ${
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
        lenderPicture
      } = this.props.singleBook;
      const availability = available ? "Available" : "Checked out";
      const dateDue = moment
        .utc(dueDate)
        .local()
        .format("dddd, MMMM Do");

      return (
        <div>
          <LinkContainer>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                ← Back to Bookmaps
              </Button>
            </Link>
          </LinkContainer>
          <BookDetailsWrapper>
            <TabsWrapper style={{ marginTop: "-30px" }}>
              <Paper>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  variant="fullWidth"
                >
                  <Tab label="Info" />
                  <Tab label="Map" />
                </Tabs>
              </Paper>
            </TabsWrapper>
            <BookCardWrapper value={this.state.value}>
              <BookWrapper>
                <BookImgWrapper>
                  <BookImg alt={title} src={image} />
                </BookImgWrapper>
                <BookInfoWrapper>
                  <h2 style={{ color: " #009EE5" }}>{title}</h2>
                  <p>by {authors}</p>
                  <Availability
                    style={{ color: "#00d369" }}
                    available={available}
                  >
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
                      <div
                        style={{
                          marginTop: ".5rem",
                          color: "#838281",
                          fontSize: ".8rem"
                        }}
                      >
                        Goodreads rating: {avgRating}
                      </div>
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
                    <Payment email={this.props.loggedInUser.email} />
                  </div>
                )}
                {this.props.loggedInUser.stripe_email && (
                  <AvatarWrapper>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.requestCheckout(bookId, lenderId)}
                    >
                      REQUEST CHECKOUT
                    </Button>
                    <div>
                      <Avatar src={lenderPicture} alt={`${lender} avatar`} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          paddingLeft: "5px"
                        }}
                      >
                        <Link
                          to={`/users/${lenderId}/library`}
                          style={{
                            textDecoration: "none",
                            color: "#009EE5",
                            fontSize: "14px"
                          }}
                        >
                          Visit {lender}'s
                          <br />
                          Library →
                        </Link>
                      </div>
                    </div>
                  </AvatarWrapper>
                )}
              </BookButtonsWrapper>
            </BookCardWrapper>
            <MapWrapper value={this.state.value}>
              <SingleBookMapview owner={lenderId} />
            </MapWrapper>
          </BookDetailsWrapper>
        </div>
      );
    } else {
      const { lenderId, borrower, lender, title } = this.props.singleBook;
      const lenderBorrowerName =
        lenderId.toString() === localStorage.getItem("userId")
          ? borrower
          : lender;
      return (
        <>
          <BackButtonWrapper>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                this.setState({ showChat: false });
              }}
            >
              ← Back
            </Button>
          </BackButtonWrapper>
          <ChatWrapper>
            <ChatButtonWrapper>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  this.setState({ showChat: false });
                }}
              >
                ← Back
              </Button>
            </ChatButtonWrapper>
            <h2>
              Talk to {lenderBorrowerName} about exchanging{" "}
              {title.substr(0, 25)}
              {title.length > 25 && "..."}
            </h2>
            <ChatApp
              user={this.props.loggedInUser}
              otherUserId={lenderId}
              exitChat={this.exitChat}
            />
          </ChatWrapper>
        </>
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
