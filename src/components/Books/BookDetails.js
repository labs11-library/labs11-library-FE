import React from "react";
import styled from "styled-components";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";

import * as moment from "moment";
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

const BookDetails = props => {
  const {
    bookId,
    title,
    authors,
    image,
    lender,
    available,
    dueDate,
    description
  } = props.book;
  const availability = available ? "Available" : "Checked out";
  function timeRemaining(dueDate) {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  }
  console.log(props.book)
  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <div>
        <h2>{title}</h2>
        <p>by {authors}</p>
        <Availability available={available}>{availability}</Availability>
        {!available && <p>Time until due: {timeRemaining(dueDate)}</p>}
        <div>Description: {description}</div>
        <p>
          Contact {lender}
        </p>
        <Link to={`/books/${bookId}`}>
          <Button>See more details</Button>
        </Link>
      </div>
    </BookDetailsWrapper>
  );
};
export default BookDetails;
