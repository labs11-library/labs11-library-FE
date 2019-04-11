import React from "react";
import styled from "styled-components";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as moment from "moment";

const Availability = styled.p`
  color: ${props => (props.available ? "green" : "red")};
`;
const SingleInventoryDetails = props => {
  if (props.loading && !props.singleInventory.title) {
    return <Loading />;
  }
  const {
    title,
    authors,
    image,
    available,
    description,
    dueDate,
    checkoutDate
  } = props.singleInventory;
  const availability = available ? "Available" : "Checked out";
  const threeWeeks = moment(checkoutDate, "YYYY-MM-DD").add(21, "days");
  return (
    <div>
      <Link
        style={{ position: "absolute", left: "10px", textDecoration: "none" }}
        to="/my-library"
      >
        <Button variant="outlined">← Back</Button>
      </Link>
      <BookDetailsWrapper>
        <BookImgWrapper>
          <BookImg alt={title} src={image} />
        </BookImgWrapper>
        <BookContentWrapper>
          <h2>{title}</h2> {/* {title.substr(0, 20)} */}
          <p>by {authors}</p>
          <Availability available={available}>{availability}</Availability>
          {!available && (
            <p>
              Date due:{" "}
              {moment(dueDate)
                .utc(threeWeeks)
                .local()
                .format("dddd, MMMM Do")}
            </p>
          )}{" "}
          <p>
            {description === ""
              ? "No description provided"
              : `Description: ${description}`}
          </p>
        </BookContentWrapper>
      </BookDetailsWrapper>
    </div>
  );
};

export default SingleInventoryDetails;

const BookDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 180px;

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
`;
const BookImgWrapper = styled.div`
  width: 120px;
  height: 180px;
`;
const BookImg = styled.img`
  width: 100%;
  height: 100%;
`;
const BookContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
