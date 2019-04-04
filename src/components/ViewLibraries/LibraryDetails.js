import React from "react";
import styled from "styled-components";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
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

const LibraryDetails = props => {
  const userId = props.match.params.userId;
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

  function timeRemaining() {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  }

  const dateDue = moment
    .utc(dueDate)
    .local()
    .format("dddd, MMMM Do");

  console.log("PROPS!!!!!!!!!!!!!!!!!", props);
  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <div>
        <h2>{title}</h2>
        <p>by {authors}</p>
        <Availability available={available}>{availability}</Availability>
        {!available && <p>Due: {dueDate} </p>}{" "}
        {/* ({timeRemaining(dueDate)} from now) */}
        <p>
          {description === ""
            ? "No description provided"
            : `Description: ${description}`}
        </p>
        <Link to={`/users/${userId}/library/${bookId}`}>
          <Button>See more details</Button>
        </Link>
      </div>
    </BookDetailsWrapper>
  );
};
export default withRouter(LibraryDetails);
