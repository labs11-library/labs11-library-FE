import React from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import axios from 'axios';
import baseUrl from '../../url';
import { BookDetailsWrapper, BookImgWrapper, BookImg, DueDate } from '../Books/styles';

import * as moment from "moment";

const BookDetails = props => {
  const {
    title,
    authors,
    image,
    lender,
    checkoutId,
    dueDate,
    lenderId,
    borrower
  } = props.checkout;

  function timeRemaining(dueDate) {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  }

  const userId = localStorage.getItem("userId");

  function confirmReturn() {
    axios
      .put(`${baseUrl}/users/${userId}/checkOut/${checkoutId}`, {
        returned: true
      })
      .then(res => {
        window.location.reload();
        return res.data;
      })
      .catch(err => console.log(err));
  }

  const dateDue = moment
    .utc(dueDate)
    .local()
    .format("dddd, MMMM Do");

  const lenderBorrowerName =
    lenderId.toString() === localStorage.getItem("userId") ? borrower : lender;

  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <div>
        <h2>{title}</h2>
        <div>by {authors}</div>
        <div>Due on: {dateDue}</div>
        <DueDate>Time until due: {timeRemaining(dueDate)}</DueDate>
        <p>Contact {lenderBorrowerName} to arrange return</p>
        <Link to={`/my-library/checkouts/${checkoutId}`}>
          <Button>Send message</Button>
        </Link>
        {lenderId.toString() === localStorage.getItem("userId") && (
          <Button onClick={confirmReturn}>Confirm return</Button>
        )}
      </div>
    </BookDetailsWrapper>
  );
};
export default BookDetails;
