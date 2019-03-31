import React, { Component } from "react";
import styled from "styled-components";
import * as moment from "moment";
import { Link } from "react-router-dom";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { connect } from 'react-redux';
import { getSingleBook } from '../redux/actions.js';

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
      singleBook: {}
    };
  }

  componentDidMount() {
    this.props.getSingleBook(this.props.match.params.bookId);
  }

  render() {
    console.log("this.state", this.state);
    console.log("this.props", this.props);
    if (!this.props.singleBook.image) {
      return <h1>Loading...</h1>;
    } else {
      const {
        title,
        authors,
        image,
        lenderName,
        location,
        available,
        dueDate
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
              <Link to="/chatapp">
                <Button>Send message</Button>
              </Link>
            </div>
          </BookDetailsWrapper>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.isLoading,
    singleBook: state.singleBook
  }
}

export default connect(
  mapStateToProps,
  { getSingleBook }
  )(SingleBook);