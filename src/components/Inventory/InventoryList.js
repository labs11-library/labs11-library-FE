import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllInventory } from "../../redux/actions/inventoryActions.js";
import InventoryDetails from "./InventoryDetails.js";
class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      inventory: [],
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
      return this.state.inventory;
    } else if (this.state.searchText.length > 0) {
      const searchRegex = new RegExp(this.state.searchText, "gi");
      return this.state.inventory.filter(
        book => book.title.match(searchRegex) || book.authors.match(searchRegex)
      );
    }
  };
  viewBook = bookId => {
    let userId = localStorage.getItem("userId");
    this.props.params.history.push(`${userId}/inventory/${bookId}`);
  };
  componentWillReceiveProps(newProps) {
    if (newProps.inventory !== this.state.inventory) {
      this.setState({
        inventory: this.props.inventory
      });
    }
  }
  componentDidMount() {
    this.props.getAllInventory();
  }
  render() {
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

const mapStateToProps = state => ({
  loadingInventory: state.inventoryReducer.loadingInventory,
  inventory: state.inventoryReducer.inventory
});
export default connect(
  mapStateToProps,
  { getAllInventory }
)(Inventory);
