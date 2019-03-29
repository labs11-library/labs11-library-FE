import React, { Component } from "react";
import books from "../data";
import CheckedOutBookDetails from "./CheckedOutBookDetails";

class CheckedOutList extends Component {
  constructor() {
    super();
    this.state = {
      checkedOutBooks: books.filter(book => book.available === false),
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
    const { checkedOutBooks, searchText } = this.state;
    if (searchText.length === 0) {
      return checkedOutBooks;
    } else if (searchText.length > 0) {
      const searchRegex = new RegExp(searchText, "gi");
      return checkedOutBooks.filter(
        book => book.title.match(searchRegex) || book.author.match(searchRegex)
      );
    }
  };
  handleSelect = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  booksByDate = () => {
    return this.searchBooks().sort((a, b) => {
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
  render() {
    return (
      <div>
        <h1>Checked Out</h1>
        <input
          placeholder="Search checked out books"
          name="searchText"
          value={this.state.searchText}
          onChange={this.handleChange}
        />
        <div>
          {this.booksByDate().map(book => {
            return <CheckedOutBookDetails book={book} />;
          })}
        </div>
      </div>
    );
  }
}

export default CheckedOutList;
