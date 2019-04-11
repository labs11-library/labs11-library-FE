import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../url";
import {
  BookDetailsWrapper,
  BookImgWrapper,
  BookImg,
  DueDate
} from "../Styles/NotificationStyles";
import { connect } from "react-redux";
import { confirmReturn } from "../../redux/actions/checkoutActions";
import { returnBook } from "../../redux/actions/inventoryActions.js";
import Loading from "../Loading/Loading";

import * as moment from "moment";

class BookDetails extends Component {
  timeRemaining = dueDate => {
    let now = moment(Date.now());
    let end = moment(dueDate);
    if (end.isBefore(moment(now))) {
      let duration = `overdue by ${moment.duration(now.diff(end)).humanize()}`;
      return duration;
    } else {
      let duration = moment.duration(now.diff(end)).humanize();
      return duration;
    }
  };

  overdue = () => {
    let now = moment(Date.now());
    let end = moment(this.props.checkout.dueDate);
    if (end.isBefore(moment(now))) {
      let duration = Math.floor(moment.duration(now.diff(end)).asDays());
      console.log("DURATION", duration);
      return duration * 100;
    }
  };

  confirmBookReturn = () => {
    this.props.confirmReturn(this.props.checkout.checkoutId);
    this.props.returnBook(this.props.checkout.bookId);
    this.props.goToMyLibrary();
  };

  chargeLateFee = () => {
    axios
      .post(`${baseUrl}/payment/charge`, {
        amount: this.overdue(),
        customer: this.props.checkout.stripe_cust_id
      })

      .then(res => console.log(res.data))
      .catch(err => console.log("Frontend error:", err));
  };
  render() {
    if (this.props.loadingCheckouts || this.props.loadingInventory) {
      return <Loading />;
    }

    const {
      title,
      authors,
      image,
      lender,
      checkoutId,
      dueDate,
      lenderId,
      borrower,
      returned,
      checkoutDate,
      lateFee
    } = this.props.checkout;

    const dateDue = moment
      .utc(dueDate)
      .local()
      .format("dddd, MMMM Do");

    const dateCheckedOut = moment
      .utc(checkoutDate)
      .local()
      .format("dddd, MMMM Do");

    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;

    const lenderBorrower =
      lenderId.toString() === localStorage.getItem("userId")
        ? "Lender"
        : "Borrower";

    const buttonText =
      this.overdue() < 0 && returned === false && lenderBorrower === "Lender"
        ? "Confirm Return"
        : this.overdue() > 0 &&
          returned === false &&
          lenderBorrower === "Lender"
        ? `Confirm Return (late fee of $${this.overdue() /
            100} will be charged)`
        : null;

    return (
      <BookDetailsWrapper>
        <BookImgWrapper>
          <BookImg alt={title} src={image} />
        </BookImgWrapper>
        <div>
          <h2>{title}</h2>
          <div>by {authors}</div>
          {!returned && (
            <div>
              <div>Due on: {dateDue}</div>
              <DueDate>Time until due: {this.timeRemaining(dueDate)}</DueDate>
            </div>
          )}
          {returned && (
            <div>
              <p>Checkout date: {dateCheckedOut}</p>
            </div>
          )}
          {!returned ? (
            <p>Contact {lenderBorrowerName} to arrange return</p>
          ) : (
            <p>Borrower: {lenderBorrowerName}</p>
          )}
          <Link style={{textDecoration: "none"}}to={`/my-library/checkouts/${checkoutId}`}>
            <Button color="primary" variant="contained">Send message</Button>
          </Link>
          {buttonText !== null && (
            <Button
              onClick={
                lateFee
                  ? this.confirmBookReturn && this.chargeLateFee
                  : this.confirmBookReturn
              }
            >
              {buttonText}
            </Button>
          )}

          {/* {lateFee && (
            <Button onClick={this.chargeLateFee}>Charge late fee</Button>
          )} */}
        </div>
      </BookDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingCheckouts: state.checkoutReducer.loadingCheckouts,
    loadingInventory: state.inventoryReducer.loadingInventory
  };
};

export default connect(
  mapStateToProps,
  { confirmReturn, returnBook }
)(withRouter(BookDetails));
