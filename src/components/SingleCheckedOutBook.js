import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import { Link } from "react-router-dom";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { connect } from "react-redux";
import { getSingleCheckedOutBook } from "../redux/actions/bookActions.js";
import ReviewForm from "./ReviewForm";

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

class SingleCheckedOutBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleCheckedOutBook: {}
    };
  }

  componentDidMount() {
    this.props.getSingleCheckedOutBook(this.props.match.params.checkedOutId);
    console.log(this.props);
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    if (!this.props.singleCheckedOutBook) {
      return <h1>Loading...</h1>;
    } else {
      const {
        title,
        authors,
        image,
        lender,
        checkedOutId,
        returned,
        available,
        checkoutDate
      } = this.props.singleCheckedOutBook;
      const availability = available ? "Available" : "Checked out";
      // function timeRemaining(dueDate) {
      //   let now = moment(Date.now());
      //   let end = moment(Date.now());
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
              {!available && <p>Date due: {dueDate}</p>}{" "}
              {/*{timeRemaining(dueDate)}*/}
              <p>Contact {lender} from around the way</p>
              <Link to="/chatapp">
                <Button>Send message</Button>
              </Link>
              {returned === 0 && <ReviewForm reviewEvent={checkedOutId} />}
            </div>
          </BookDetailsWrapper>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.bookReducer.fetchingBooks,
    singleCheckedOutBook: state.bookReducer.singleCheckedOutBook
  };
};

export default connect(
  mapStateToProps,
  { getSingleCheckedOutBook }
)(SingleCheckedOutBook);
