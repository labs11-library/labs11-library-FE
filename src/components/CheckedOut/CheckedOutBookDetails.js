import React from "react";
import styled from "styled-components";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import axios from 'axios';
import baseUrl from '../../url';

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

const DueDate = styled.p`
  color: red;
`;

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

  const userId = localStorage.getItem("userId")

  function confirmReturn() {
    axios
    .put(`${baseUrl}/users/${userId}/checkOut/${checkoutId}`, {returned: true})
    .then(res => {
      window.location.reload()
      return res.data
    })
    .catch(err => console.log(err))
  }

  const dateDue = moment
        .utc(dueDate)
        .local()
        .format("dddd, MMMM Do");

  const lenderBorrowerName = lenderId.toString() === localStorage.getItem("userId") ? borrower : lender
  
  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <div>
        <h2>{title}</h2>
        <p>by {authors}</p>
        <p>Due on: {dateDue}</p>
        <DueDate>Time until due: {timeRemaining(dueDate)}</DueDate>
        <p>
          Contact {lenderBorrowerName} to arrange return
        </p>
        <Link to={`/mylibrary/checkouts/${checkoutId}`}>
          <Button>Send message</Button>
        </Link>
        { lenderId.toString() === localStorage.getItem("userId") && <Button onClick={confirmReturn}>Confirm return</Button> }
      </div>
    </BookDetailsWrapper>
  );
};
export default BookDetails;
