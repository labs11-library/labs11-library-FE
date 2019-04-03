import React, { Component } from "react";
import books from "../../data";
import CheckedOutBookDetails from "./CheckedOutBookDetails";

import { connect } from "react-redux";
import { getCheckouts } from "../../redux/actions/checkoutActions.js";
class CheckedOutList extends Component {
  constructor() {
    super();
    this.state = {
      checkouts: [],
      filter: "all",
      searchText: ""
    };
  }
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getCheckouts(userId);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.checkouts !== this.props.checkouts) {
      this.setState({
        checkouts: this.props.checkouts
      });
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSelect = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  checkoutsByDate = () => {
    return this.props.checkouts.sort((a, b) => {
      let aDate = new Date(a.dueDate);
      let bDate = new Date(b.dueDate);
      if (aDate < bDate) {
        return -1;
      } else if (aDate > bDate) {
        return 1;
      } else if (aDate === bDate) {
        return 0;
      }
    });
  };

  filterIncomingCheckouts = () => {
    let userId = localStorage.getItem("userId");
    return this.props.checkouts.filter(
      checkout => checkout.lenderId.toString() === userId && checkout.returned === false
    );
  };

  filterOutgoingCheckouts = () => {
    let userId = localStorage.getItem("userId");
    return this.props.checkouts.filter(
      checkout => checkout.borrowerId.toString() === userId && checkout.returned === false
    );
  };

  filterTransactionHistory = () => {
    return this.props.checkouts.filter(
      checkout => checkout.returned === true
    );
  };

  render() {
    console.log("this.props.checkouts", this.props.checkouts);
    // ^^ so nasty
    if (this.props.loadingCheckouts) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <h1>Loaned out books</h1>
          <div>
            {this.filterIncomingCheckouts().map(checkout => {
              return (
                <CheckedOutBookDetails
                  key={checkout.checkoutId}
                  checkout={checkout}
                />
              );
            })}
          </div>
          <h1>Borrowed books</h1>
          <div>
            {this.filterOutgoingCheckouts().map(checkout => {
              return (
                <CheckedOutBookDetails
                  key={checkout.checkoutId}
                  checkout={checkout}
                />
              );
            })}
          </div>
          <h1>Transaction History</h1>
          <div>
            {this.filterTransactionHistory().map(checkout => {
              return (
                <CheckedOutBookDetails
                  key={checkout.checkoutId}
                  checkout={checkout}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loadingCheckouts: state.checkoutReducer.loadingCheckouts,
  checkouts: state.checkoutReducer.checkouts
});

export default connect(
  mapStateToProps,
  { getCheckouts }
)(CheckedOutList);
