import React from "react";
import "@progress/kendo-theme-material/dist/all.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  BookTextContainer,
  Availability
} from "../Styles/InventoryStyles.js";

const BookDetails = props => {
  const {
    bookId,
    title,
    authors,
    image,
    available,
    dueDate,
    description
  } = props.book;
  const availability = available ? "Available" : "Checked out";
  const descriptionText =
    description.length > 40 ? `${description.substr(0, 40)} ...` : description;
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
        <p>
          {description === "" ? "No description provided" : descriptionText}
        </p>
        <Link
          style={{ textDecoration: "none" }}
          to={`/my-library/my-books/${bookId}`}
        >
          <Button variant="contained" color="primary">
            See more details
          </Button>
        </Link>
      </BookTextContainer>
    </BookDetailsWrapper>
  );
};
export default BookDetails;
