import React, { Component } from "react";

import { connect } from "react-redux";
import { getCheckouts } from "../../redux/actions/checkoutActions";
import {
  TransactionWrapper,
  TransDetailsWrapper
} from "../Styles/TransactionsStyles";

import Auth from "../Auth/Auth";

class Transactions extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getCheckouts(userId);
  }

  render() {
    return (
      <TransactionWrapper>
        <h2>Transaction History</h2>
        {this.props.checkouts
          .map(
            (checkout, index) =>
              checkout.returned && (
                <TransDetailsWrapper>
                  <p>Transaction #{index + 1}</p>
                  <p>Borrower: {checkout.borrower}</p>
                  <p>Book: {checkout.title}</p>
                  <p>Checkout Date: {checkout.checkoutDate}</p>
                  <p>Due Date: {checkout.dueDate}</p>
                  <p>Date returned: {checkout.returnedDate}</p>
                  <p>Overdue: {checkout.overdue ? "Yes" : "No"}</p>
                </TransDetailsWrapper>
              )
          )
          .sort(this.props.checkouts.checkoutId)}
      </TransactionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  checkouts: state.checkoutReducer.checkouts
});

const TransactionsComponent = connect(
  mapStateToProps,
  { getCheckouts }
)(Transactions);

export default Auth(TransactionsComponent);
