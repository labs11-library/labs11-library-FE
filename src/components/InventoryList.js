import React, { Component } from "react";
// import books from "../data";
import BookDetails from "./BookDetails";

import { connect } from "react-redux";
import { getAllInventory } from "../redux/actions.js";
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
    const { inventory, searchText } = this.state;
    if (searchText.length === 0) {
      return inventory;
    } else if (searchText.length > 0) {
      const searchRegex = new RegExp(searchText, "gi");
      return inventory.filter(
        book => book.title.match(searchRegex) || book.author.match(searchRegex)
      );
    }
  };
  componentWillReceiveProps(newProps) {
    if (newProps.books !== this.state.inventory) {
      this.setState({
        inventory: this.props.books
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
            return <BookDetails book={book} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.isLoading,
  books: state.books
});
export default connect(
  mapStateToProps,
  { getAllInventory }
)(Inventory);
