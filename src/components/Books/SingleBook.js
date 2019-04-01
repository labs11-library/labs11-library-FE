import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import { Link } from "react-router-dom";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { connect } from "react-redux";
import { getSingleBook } from "../../redux/actions/bookActions.js";
import Ratings from "react-ratings-declarative";
import ChatApp from "../Chat/ChatApp";
import { getLoggedInUser } from "../../redux/actions/authActions.js";

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

  render() {
    console.log("this.state", this.state);
    console.log("this.props", this.props);
    if (!this.props.singleBook.image) {
      return <h1>Loading...</h1>;
    } else if ( this.props.singleBook.image && this.state.showChat === false) {
      const {
        title,
        authors,
        image,
        lenderName,
        location,
        avgRating,
        available,
        dueDate,
        lenderId
      } = this.props.singleBook;
      const availability = available ? "Available" : "Checked out";
      function timeRemaining(dueDate) {
        let now = moment(Date.now());
        let end = moment(dueDate);
        let duration = moment.duration(now.diff(end)).humanize();
        return duration;
      }
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
              {!available && <p>Time until due: {timeRemaining(dueDate)}</p>}
              <p>
                Contact {lenderName} from {location}
              </p>
              <Button onClick={() => this.setState({showChat: true})} >Send message</Button>
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
        <ChatApp user={this.props.loggedInUser} otherUserId={this.props.singleBook.lenderId}/>
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
  { getSingleBook, getLoggedInUser }
)(SingleBook);
