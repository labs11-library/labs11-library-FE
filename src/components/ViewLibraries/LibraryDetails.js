import React from "react";
import "@progress/kendo-theme-material/dist/all.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
// import * as moment from "moment";
// import {
//   BookDetailsWrapper,
//   BookImgWrapper,
//   BookImg,
//   Availability
// } from "../Books/styles";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  BookTextContainer,
  Availability
} from "../Styles/InventoryStyles.js";

const LibraryDetails = props => {
  const {
    bookId,
    title,
    authors,
    image,
    available,
    dueDate
  } = props.book;
  const availability = available ? "Available" : "Checked out";

  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <BookTextContainer>
        <h2>
          {title.substr(0, 25)}
          {title.length > 25 && "..."}
        </h2>
        <p>by {authors}</p>
        <Availability available={available}>{availability}</Availability>
        {!available && <p>Due: {dueDate} </p>}{" "}
        <Link style={{ textDecoration: "none" }} to={`/books/${bookId}`}>
          <Button variant="contained" color="primary">
            See more details
          </Button>
        </Link>
      </BookTextContainer>
    </BookDetailsWrapper>
  );
};
export default withRouter(LibraryDetails);
