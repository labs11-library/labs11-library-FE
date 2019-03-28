import React, { Component } from "react";
import books from "../data";
import BookDetails from "./BookDetails";

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      inventory: books,
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

export default Inventory;
