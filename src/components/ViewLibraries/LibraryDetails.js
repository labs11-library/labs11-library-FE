import React from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import * as moment from "moment";
import { BookDetailsWrapper, BookImgWrapper, BookImg, Availability } from '../Books/styles';

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

  // function timeRemaining() {
  //   let now = moment(Date.now());
  //   let end = moment(dueDate);
  //   let duration = moment.duration(now.diff(end)).humanize();
  //   return duration;
  // }

  // const dateDue = moment
  //   .utc(dueDate)
  //   .local()
  //   .format("dddd, MMMM Do");

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
