import React, { Component } from "react";
import styled from "styled-components";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../url";
import { addCheckout } from "../../redux/actions/checkoutActions.js";
import { connect } from "react-redux";
import { BookDetailsWrapper, BookImgWrapper, BookImg } from '../Books/styles';

class RequestDetails extends Component {
  deleteRequest = () => {
    const { lenderId, checkoutRequestId } = this.props.request;
    axios
      .delete(
        `${baseUrl}/users/${lenderId}/checkoutrequest/${checkoutRequestId}`
      )
      .then(res => {
        window.location.reload();
        return res.data;
      })
      .catch(err => console.log(err));
  };

  confirmCheckout = () => {
    const { checkoutRequestId, bookId } = this.props.request;
    this.props.addCheckout(checkoutRequestId, bookId);
    axios
      .put(`${baseUrl}/books/${bookId}`, { available: false })
      .then(res => {
        window.location.reload();
        return res.data;
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      checkoutRequestId,
      title,
      authors,
      image,
      description,
      lenderId,
      borrower,
      lender
    } = this.props.request;
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;
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
          <p>Contact {lenderBorrowerName} to arrange a book exchange</p>
          <Link to={`/notifications/${checkoutRequestId}`}>
            <Button>Send Message</Button>
          </Link>
          {/* The button below will DELETE by checkoutRequestId  */}
          <Button onClick={this.deleteRequest}>Delete request</Button>
          <Button onClick={this.confirmCheckout}>Confirm book transfer</Button>
        </div>
      </BookDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.bookReducer.loadingCheckouts
  };
};

export default connect(
  mapStateToProps,
  { addCheckout }
)(RequestDetails);
