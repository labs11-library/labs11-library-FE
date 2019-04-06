import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllInventory } from "../../redux/actions/inventoryActions.js";
import InventoryDetails from "./InventoryDetails.js";
import Auth from "../Auth/Auth";

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
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
    this.props.params.history.push(`${userId}/inventory/${bookId}`);
  };
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getAllInventory(userId);
  }
  render() {
    if (this.props.addingBook || this.props.loadingInventory) {
      return <h1>Loading...</h1>;
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
                <InventoryDetails
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
  addingBook: state.bookReducer.fetchingBooks,
  inventory: state.inventoryReducer.inventory
});
export default connect(
  mapStateToProps,
  { getAllInventory }
)(Auth(Inventory));
