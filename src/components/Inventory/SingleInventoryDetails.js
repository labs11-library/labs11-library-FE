import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
const Availability = styled.p`
  color: ${props => (props.available ? "green" : "red")};
`;
const SingleInventoryDetails = props => {
  const {
    title,
    authors,
    image,
    lenderName,
    location,
    available,
    dueDate,
    description
  } = props.singleInventory;
  const availability = available ? "Available" : "Checked out";
  return (
    <BookDetailsWrapper>
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
      <Link to="/inventory">
        <Button>Back to Inventory</Button>
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
