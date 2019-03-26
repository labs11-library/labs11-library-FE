import React, { Component } from "react";
import books from "../data";
import BookDetails from "./BookDetails";

class Books extends Component {
  constructor() {
    super();
    this.state = {
      books: books
    };
  }

  render() {
    return (
      <div>
        <h1>All books</h1>
        <input placeholder="Search books" />
        <div>
          {this.state.books.map(book => {
            return <BookDetails book={book} />;
          })}
        </div>
      </div>
    );
  }
}

export default Books;
