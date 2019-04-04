import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllInventory } from "../../redux/actions/inventoryActions.js";
import LibraryDetails from "./LibraryDetails";

class LibraryList extends Component {
  constructor() {
    super();
    this.state = {
      // inventory: [],
      searchText: ""
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  searchBooks = () => {
    if (this.state.searchText.length === 0) {
      return this.props.inventory;
    } else if (this.state.searchText.length > 0) {
      const searchRegex = new RegExp(this.state.searchText, "gi");
      return this.props.inventory.filter(
        book => book.title.match(searchRegex) || book.authors.match(searchRegex)
      );
    }
  };
  viewBook = bookId => {
    let userId = localStorage.getItem("userId");
    this.props.params.history.push(`${userId}/library/${bookId}`);
  };
  // componentWillReceiveProps(newProps) {
  //   if (newProps.inventory !== this.state.inventory) {
  //     this.setState({
  //       inventory: this.props.inventory
  //     });
  //   }
  // }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.getAllInventory(userId);
  }
  render() {
    if (this.props.loadingInventory) {
      return <h1>Loading...</h1>;
    } else if (this.props.inventory.length === 0) {
      return <h1>There are no books in this user's library.</h1>;
    } else {
      return (
        <div>
          <h1>Inventory</h1>
          <input
            placeholder="Search inventory"
            name="searchText"
            value={this.state.searchText}
            onChange={this.handleChange}
          />
          <div>
            {this.searchBooks().map(book => {
              return (
                <LibraryDetails
                  book={book}
                  viewBook={this.viewBook}
                  key={book.bookId}
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
  loadingInventory: state.inventoryReducer.loadingInventory,
  inventory: state.inventoryReducer.inventory
});
export default connect(
  mapStateToProps,
  { getAllInventory }
)(LibraryList);
