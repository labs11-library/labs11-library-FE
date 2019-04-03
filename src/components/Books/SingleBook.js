import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { connect } from "react-redux";
import { getSingleBook } from "../../redux/actions/bookActions.js";
import Ratings from "react-ratings-declarative";
import ChatApp from "../Chat/ChatApp";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import { addCheckoutRequest } from '../../redux/actions/checkoutActions.js'
const BookDetailsWrapper = styled.div`
  width: 60vw;
  border-bottom: 2px solid grey;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  height: 400px;
`;
const BookImgWrapper = styled.div`
  width: 250px;
  height: 375px;
`;
const BookImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Availability = styled.p`
  color: ${props => (props.available ? "green" : "red")};
`;

class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleBook: {},
      showChat: false
    };
  }

  componentDidMount() {
    this.props.getSingleBook(this.props.match.params.bookId);
    this.props.getLoggedInUser();
  }
  // componentWillUnmount() {
  //   this.setState({
  //     showChat: false
  //   })
  // }
  exitChat = () => {
    this.setState({
      showChat: false
    })
  }
  requestCheckout = (bookId, lenderId) => {
    this.props.addCheckoutRequest(bookId, lenderId);
    console.log("I'm being invoked")
    this.setState({
      showChat: true
    })
  }
  render() {
    // console.log("this.state", this.state);
    // console.log("this.props", this.props);
    console.log("this.state.showChat", this.state.showChat)
    if (!this.props.singleBook.image) {
      return <h1>Loading...</h1>;
    } else if ( this.props.singleBook.image && this.state.showChat === false) {
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
              <p>
                Contact {lender}
              </p>
              <Button onClick={() => this.setState({showChat: true})} >Send message</Button>
              {/* <Button onClick={() => this.setState({showChat: true})} >Request checkout</Button> */}
              <Button onClick={() => this.requestCheckout(bookId, lenderId)} >Request checkout</Button>
              {
                avgRating &&
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
              }
            </div>
          </BookDetailsWrapper>
        </div>
      );
    } else {
      return (
        <div>
          <ChatApp user={this.props.loggedInUser} otherUserId={this.props.singleBook.lenderId} exitChat={this.exitChat}/>
          <Button onClick={() => this.setState({showChat: false})} >Go back</Button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.bookReducer.fetchingBooks,
    singleBook: state.bookReducer.singleBook,
    loggedInUser: state.authReducer.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { getSingleBook, getLoggedInUser, addCheckoutRequest }
)(SingleBook);
