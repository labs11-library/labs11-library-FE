import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../url";
import { DueDate } from "../Styles/NotificationStyles";
import {
  BookDetailsWrapper,
  ButtonContainer,
  BookDetailsContainer
} from "../Styles/NotificationStyles";
import {
  BookImgWrapper,
  BookImg,
  BookTextContainer
} from "../Styles/InventoryStyles";
import { connect } from "react-redux";
import { confirmReturn, setLateFee } from "../../redux/actions/checkoutActions";
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
      return duration * 100;
    }
  };

  confirmBookReturn = () => {
    console.log("I;ve been invoked");
    this.props.confirmReturn(this.props.checkout.checkoutId);
    this.props.returnBook(this.props.checkout.bookId);
    this.props.goToMyLibrary();
  };
  confirmAndCharge = () => {
    this.confirmBookReturn();
    this.chargeLateFee();
  };
  chargeLateFee = () => {
    axios
      .post(`${baseUrl}/payment/charge`, {
        amount: this.overdue(),
        customer: this.props.checkout.stripe_cust_id
      })

      .then(res => console.log(res.data))
      .catch(err => console.log("Frontend error:", err));
    console.log(this.props.checkout.checkoutId, this.overdue());
    this.props.setLateFee(this.props.checkout.checkoutId, this.overdue());
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
      returned
    } = this.props.checkout;

    const dateDue = moment
      .utc(dueDate)
      .local()
      .format("dddd, MMMM Do");

    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
        : lender;

    const lenderBorrower =
      lenderId.toString() === localStorage.getItem("userId")
        ? "Borrower"
        : "Lender";

    const buttonText =
      this.overdue() === undefined &&
      returned === false &&
      lenderBorrower === "Borrower"
        ? "Confirm Return"
        : this.overdue() > 0 &&
          returned === false &&
          lenderBorrower === "Borrower"
        ? `Confirm Return (and charge $${this.overdue() / 100} late fee)`
        : null;
    console.log(title, this.overdue());
    return (
      <BookDetailsWrapper>
        <BookDetailsContainer>
          <BookImgWrapper>
            <BookImg alt={title} src={image} />
          </BookImgWrapper>
          <BookTextContainer>
            <h2>
              {title.substr(0, 28)}
              {title.length > 28 && "..."}
            </h2>
            <p>by {authors}</p>
            {!returned && (
              <>
                <p>Due on: {dateDue}</p>
                <DueDate style={{ color: "#ff5454" }}>
                  Time until due: {this.timeRemaining(dueDate)}
                </DueDate>
                <p>
                  {lenderBorrower}: {lenderBorrowerName}
                </p>
              </>
            )}
          </BookTextContainer>
        </BookDetailsContainer>
        <ButtonContainer>
          <Link
            style={{ textDecoration: "none" }}
            to={`/my-library/checkouts/${checkoutId}`}
          >
            <Button
              style={{ margin: "10px 5px" }}
              color="primary"
              variant="contained"
            >
              Send message
            </Button>
          </Link>
          {/* <Button style={{ margin: "10px 5px" }} color="primary" variant="outlined">Send email reminder</Button> */}
          {buttonText !== null && (
            <Button
              color="primary"
              variant="outlined"
              style={{ margin: "10px 5px", maxWidth: "200px" }}
              onClick={
                this.overdue() === null
                  ? this.confirmAndCharge
                  : this.confirmBookReturn
              }
            >
              {buttonText}
            </Button>
          )}
          {/* {lateFee && (
            <Button onClick={this.chargeLateFee}>Charge late fee</Button>
          )} */}
        </ButtonContainer>
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
  { confirmReturn, returnBook, setLateFee }
)(withRouter(BookDetails));
