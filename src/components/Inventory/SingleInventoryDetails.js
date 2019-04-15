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
          <Availability style={{ color: "#00d369" }} available={available}>
            {availability}
          </Availability>
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
  justify-content: flex-start;
  height: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 7px;
  background-color: white;

  h2 {
    font-size: 1.5rem;
    color: #009ee5;
  }

  p {
    font-size: 1rem;
    color: #838281;
  }
`;
const BookImgWrapper = styled.div`
  min-width: 120px;
  max-width: 120px;
  min-height: 180px;
  max-height: 180px;
  margin-right: 10px;
  border-radius: 7px;
`;
const BookImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 7px 0 0 7px;
`;
const BookContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
