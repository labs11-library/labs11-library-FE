import React, { Component } from "react";
import RequestDetails from "./RequestDetails";
import { connect } from "react-redux";
import { getCheckoutRequests } from "../../redux/actions/checkoutActions.js";

class Requests extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      filter: "all"
    };
  }

//   filteredBooks = () => {
//     const { filter } = this.state;
//     if (filter === "all") {
//       return this.searchBooks();
//     } else if (filter === "available") {
//       return this.searchBooks().filter(book => book.available === true);
//     }
//   };
  componentWillReceiveProps(newProps) {
    if (newProps.checkoutRequests !== this.state.checkoutRequests) {
      this.setState({
        checkoutRequests: this.props.checkoutRequests
      });
    }
  }
  componentDidMount() {
    this.props.getCheckoutRequests();
  }

  render() {
    console.log("/books this.props", this.props);
    console.log("/books this.state", this.state);
    if (!this.props.checkoutRequests.length) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <h1>Pending checkouts</h1>
          <div>
            {this.props.checkoutRequests.map(request => {
              return (
                <RequestDetails
                  key={request.requestId}
                  request={request}
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
  loadingRequests: state.checkoutReducer.loadingRequests,
  checkoutRequests: state.checkoutReducer.checkoutRequests
});
export default connect(
  mapStateToProps,
  { getCheckoutRequests }
)(Requests);
