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

const BookDetails = props => {
  const { bookId, title, authors, image, available, dueDate } = props.book;
  const availability = available ? "Available" : "Checked out";
  console.log(props.checkouts);
  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <BookTextContainer>
        <h2>
          {title.substr(0, 28)}
          {title.length > 28 && "..."}
        </h2>
        <p>by {authors}</p>
        <Availability available={available}>{availability}</Availability>
        {dueDate && <p>Date due: {dueDate}</p>}
        <Link style={{ textDecoration: "none" }} to={`/books/${bookId}`}>
          <Button
            style={{ padding: "10px 20px" }}
            variant="contained"
            color="primary"
          >
            See more details
          </Button>
        </Link>
      </BookTextContainer>
    </BookDetailsWrapper>
  );
};
export default BookDetails;
