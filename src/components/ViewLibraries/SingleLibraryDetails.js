import React, { Component } from "react";
import styled from "styled-components";

import { Button } from "@progress/kendo-react-buttons";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getSingleInventory } from "../../redux/actions/inventoryActions.js";

import * as moment from "moment";
class SingleLibraryDetails extends Component {
  timeRemaining = dueDate => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  };
  goBack = e => {
    this.props.history.push(`/users/${this.props.match.params.userId}/library`);
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    const bookId = this.props.match.params.bookId;
    this.props.getSingleInventory(userId, bookId);
  }
  render() {
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
    console.log(this.props.match.params.userId);
    if (this.props.loading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <BookDetailsWrapper>
          <Button
            onClick={this.goBack}
            style={{ position: "absolute", left: "0" }}
          >
            ← Back
          </Button>
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
  }
}

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
