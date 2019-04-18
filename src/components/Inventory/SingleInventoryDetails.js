import React from "react";
import styled from "styled-components";
import Loading from "../Loading/Loading";
import * as moment from "moment";
import { BookImgWrapper, BookImg } from "../Styles/InventoryStyles";

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
    <div style={{ marginTop: "10px" }}>
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
  min-height: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 7px;
  background-color: white;
  padding: 0px 0 6px;

  h2 {
    padding-top: 6px;
    font-size: 1.5rem;
    color: #009ee5;
  }

  p {
    padding: 2px 0;
    font-size: 1rem;
    color: #838281;
  }
`;

const BookContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  padding-right: 5px;
`;
