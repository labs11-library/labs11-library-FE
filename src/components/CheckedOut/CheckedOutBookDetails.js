import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { Button } from "@progress/kendo-react-buttons";
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
    let duration = moment.duration(now.diff(end)).humanize();
    return duration;
  };

  overdue = () => {
    let now = moment(Date.now());
    let end = moment(this.props.checkout.dueDate);
    let duration = Math.floor(moment.duration(now.diff(end)).asDays());
    // let duration = end - now;
    return duration * 100;
  };

  confirmBookReturn = () => {
    const userId = localStorage.getItem("userId");
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
      bookId,
      authors,
      image,
      lender,
      checkoutId,
      dueDate,
      lenderId,
      borrower,
      returned,
      checkoutDate,
      overdue,
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

    const usdFee = this.overdue() / 100;
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
          <p>Contact {lenderBorrowerName} to arrange return</p>
          <Link to={`/my-library/checkouts/${checkoutId}`}>
            <Button>Send message</Button>
          </Link>
          {lenderId.toString() === localStorage.getItem("userId") && (
            <Button
              onClick={
                lateFee
                  ? this.confirmBookReturn && this.chargeLateFee
                  : this.confirmBookReturn
              }
            >
              {usdFee < 0 && returned === false
                ? "Confirm Return"
                : `Confirm Return (late fee of $${usdFee} will be charged)`}
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
