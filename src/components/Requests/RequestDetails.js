import React from "react";
import styled from "styled-components";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";

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

const RequestDetails = props => {
  const {
    checkoutRequestId,
    title,
    authors,
    image,
    description,
    // lender,
    borrower
  } = props.request;
//   const lenderBorrower = lenderId === localStorage.getItem("userId") ? "Borrower" : "Lender"
//   const lenderBorrowerName = lenderId === localStorage.getItem("userId") ? {borrower} : {lender}
  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <div>
        <h2>{title}</h2>
        <p>by {authors}</p>
        <div>Description: {description}</div>
        <div>Borrower: {borrower}</div>
        <Link to={`/library/requests/${checkoutRequestId}`}>
          <Button>Coordinate book exchange</Button>
        </Link>
        {/* The button below will DELETE by checkoutRequestId  */}
        <Button>Decline request</Button> 
      </div>
    </BookDetailsWrapper>
  );
};
export default RequestDetails;
