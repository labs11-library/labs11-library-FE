import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import * as moment from "moment";
import { Link } from "react-router-dom";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";

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
    super(props)
    this.state = {
      book: {},
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props;
  
    axios.get(`/users/${params.userId}/checkedOut/${params.checkedOutId}`)
      .then(({ data: book }) => {
        console.log('book', book);
  
        this.setState({ book });
      });
  }
  
  render() {
    console.log("this.props", this.props)
    console.log("this.state", this.state)
    const {
      title,
      author,
      image,
      lenderName,
      location,
      available,
      dueDate
    } = this.state.book;
    const availability = available ? "Available" : "Checked out";
    function timeRemaining(dueDate) {
      let now = moment(Date.now());
      let end = moment(dueDate);
      let duration = moment.duration(now.diff(end)).humanize();
      return duration;
    }
    if (!this.state.book) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
           <BookDetailsWrapper>
           <BookImgWrapper>
             <BookImg alt={title} src={image} />
           </BookImgWrapper>
           <div>
             <h2>{title}</h2>
             <p>by {author}</p>
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
};


export default SingleCheckedOutBook

