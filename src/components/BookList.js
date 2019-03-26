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
      filter: "all"
    };
  }

  handleSearch = event => {};
  handleSelect = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  filteredBooks = () => {
    const { books, filter } = this.state;
    if (filter === "all") {
      return books;
    } else if (filter === "available") {
      return books.filter(book => book.available === true);
    }
  };
  render() {
    return (
      <div>
        <h1>All books</h1>
        <input placeholder="Search books" />
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
          {this.filteredBooks().map((book, id) => {
            return <BookDetails key={id} book={book} />;
          })}
        </div>
      </div>
    );
  }
}

export default Books;
