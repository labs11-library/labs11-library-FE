import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";

const Availability = styled.p`
  color: ${props => (props.available ? "green" : "red")};
`;
const SingleInventoryDetails = props => {
  const userId = localStorage.getItem("userId");
  const {
    bookId,
    title,
    authors,
    image,
    available,
    dueDate,
    description
  } = props.singleInventory;
  const availability = available ? "Available" : "Checked out";
  return (
    <BookDetailsWrapper>
      <Link style={{ position: "absolute", left: "0" }} to="/my-library">
        <Button>← Back</Button>
      </Link>
      <BookImgWrapper>
        <BookImg alt={title} src={image} />
      </BookImgWrapper>
      <div>
        <h2>{title}</h2>
        <p>by {authors}</p>
        <Availability available={available}>{availability}</Availability>
        <p>
          {description === ""
            ? "No description provided"
            : `Description: ${description}`}
        </p>
        {!available && <p>Time until due: {props.timeRemaining(dueDate)}</p>}
      </div>
      <Link>
        <Button onClick={() => props.deleteInventory(userId, bookId)}>
          Remove from Inventory
        </Button>
      </Link>
    </BookDetailsWrapper>
  );
};

export default SingleInventoryDetails;

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
