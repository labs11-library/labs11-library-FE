import React, { Component } from "react";
import CheckedOutBookDetails from "./CheckedOutBookDetails";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCheckouts } from "../../redux/actions/checkoutActions.js";
import Auth from "../Auth/Auth";
import Loading from "../Loading/Loading.js";
import { CheckoutHeader, NoCheckouts } from "../Styles/CheckoutStyles.js";
class CheckedOutList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "all",
      searchText: ""
    };
  }
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getCheckouts(userId);
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
      checkout =>
        checkout.lenderId.toString() === userId && checkout.returned === false
    );
  };

  filterOutgoingCheckouts = () => {
    let userId = localStorage.getItem("userId");
    return this.props.checkouts.filter(
      checkout =>
        checkout.borrowerId.toString() === userId && checkout.returned === false
    );
  };

  filterTransactionHistory = () => {
    return this.props.checkouts.filter(checkout => checkout.returned === true);
  };

  render() {
    if (this.props.loadingCheckouts) {
      return <Loading />;
    } else {
      return (
        <div>
          <CheckoutHeader>On loan</CheckoutHeader>
          {
            (this.filterIncomingCheckouts().length === 0) &&
              <NoCheckouts>
                You have not loaned out any books.{" "}
                <Link to="/add-book">Click here</Link> to add books to your library.
              </NoCheckouts>
              
          }
          <div>
            {this.filterIncomingCheckouts().map(checkout => {
              return (
                <CheckedOutBookDetails
                  key={checkout.checkoutId}
                  checkout={checkout}
                  goToMyLibrary={this.props.goToMyLibrary}
                />
              );
            })}
          </div>
          <CheckoutHeader>Borrowing</CheckoutHeader>
          {
            (this.filterOutgoingCheckouts().length === 0) &&
              <NoCheckouts>
                You have not borrowed any books.{" "}
                <Link to="/browse">Click here</Link> to find your next favourite book.
              </NoCheckouts>
              
          }
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
)(Auth(CheckedOutList));
