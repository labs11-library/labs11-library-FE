import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getSingleInventory } from "../../redux/actions/inventoryActions.js";
class SingleLibraryDetails extends React.Component {
  const userId = props.match.params.userId;
  const {
    bookId,
    title,
    authors,
    image,
    available,
    dueDate,
    description
  } = this.props.singleInventory;
  const availability = available ? "Available" : "Checked out";
  timeRemaining = dueDate => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  };
  render() {
    return (
      <BookDetailsWrapper>
        <Link
          style={{ position: "absolute", left: "0" }}
          to={`users/${userId}/inventory`}
          >
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
          {!available && <p>Available in: {this.timeRemaining(dueDate)}</p>}
        </div>
      </BookDetailsWrapper>
    );
  }
};

const mapStateToProps = state => {
  return {
    loading: state.inventoryReducer.loadingInventory,
    singleInventory: state.inventoryReducer.singleInventory
  };
};

const routerComponent = withRouter(SingleLibraryDetails);

export default connect(
  mapStateToProps,
  { getSingleInventory }
  )(routerComponent);
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
