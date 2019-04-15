import React from "react";
import "@progress/kendo-theme-material/dist/all.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import * as moment from "moment";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  Availability,
  BookTextContainer,
  AvatarContainer
} from "../Styles/LandingPageStyles.js";
import Avatar from "@material-ui/core/Avatar";
import { AvatarWrapper } from "./styles";
const BookDetails = props => {
  const {
    bookId,
    title,
    authors,
    image,
    available,
    dueDate,
    lender,
    lenderPicture,
    lenderId
  } = props.book;

  const dateDue = moment
    .utc(dueDate)
    .local()
    .format("dddd, MMMM Do");

  const availability = available ? "Available" : "Checked out";
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

        {dueDate && <p>Due date: {dateDue}</p>}
        <AvatarWrapper>
          <Link style={{ textDecoration: "none" }} to={`/books/${bookId}`}>
            <Button
              style={{ padding: "10px 20px" }}
              variant="contained"
              color="primary"
            >
              See more details
            </Button>
          </Link>
          <AvatarContainer>
            <Avatar src={lenderPicture} alt={`${lender} avatar`} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "5px"
              }}
            >
              {/* <p>{lender}</p> */}
              <Link
                to={`/users/${lenderId}/library`}
                style={{
                  textDecoration: "none",
                  color: "#009EE5",
                  fontSize: "14px"
                }}
              >
                Visit {lender}'s
                <br />
                Library →
              </Link>
            </div>
          </AvatarContainer>
        </AvatarWrapper>
      </BookTextContainer>
    </BookDetailsWrapper>
  );
};
export default BookDetails;
