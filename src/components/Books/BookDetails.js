import React from "react";
import "@progress/kendo-theme-material/dist/all.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  Availability,
  BookTextContainer
} from "../Styles/LandingPageStyles.js";

import * as moment from "moment";

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
  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <BookTextContainer>
        <h2>{title}</h2>
        <p>by {authors}</p>
        <Availability available={available}>{availability}</Availability>
        {!available && <p>Time until due: {timeRemaining(dueDate)}</p>}
        <div>Description: {description}</div>
        <p>Contact {lender}</p>
        <Link style={{ textDecoration: "none" }} to={`/books/${bookId}`}>
          <Button variant="contained" color="primary">
            See more details
          </Button>
        </Link>
      </BookTextContainer>
    </BookDetailsWrapper>
  );
};
export default BookDetails;
