import React, { Component } from "react";
import books from "../data";
import BookDetails from "./BookDetails";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class Books extends Component {
  constructor() {
    super();
    this.state = {
      books: books,
      filter: "all",
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
    const { books, searchText } = this.state;
    if (searchText.length === 0) {
      return books;
    } else if (searchText.length > 0) {
      const searchRegex = new RegExp(searchText, "gi");
      return books.filter(
        book => book.title.match(searchRegex) || book.author.match(searchRegex)
      );
    }
  };
  handleSelect = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  filteredBooks = () => {
    const { filter } = this.state;
    if (filter === "all") {
      return this.searchBooks();
    } else if (filter === "available") {
      return this.searchBooks().filter(book => book.available === true);
    }
  };

  render() {
    return (
      <div>
        <h1>All books</h1>
        <input
          placeholder="Search books"
          name="searchText"
          value={this.state.searchText}
          onChange={this.handleChange}
        />
        <div>
          <InputLabel style={{ padding: "10px" }}>Filter by:</InputLabel>
          <Select
            style={{ minWidth: "100px" }}
            label={this.state.filter}
            value={this.state.filter}
            inputProps={{
              name: "filter"
            }}
            onChange={this.handleSelect}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"available"}>Available</MenuItem>
          </Select>
        </div>
        <div>
          {this.filteredBooks().map((book) => {
            return (
              <BookDetails
                key={book.bookId}
                book={book}
                username={this.state.username}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Books;