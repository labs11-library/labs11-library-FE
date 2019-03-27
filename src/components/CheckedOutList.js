import React, { Component } from "react";
import books from "../data";
import BookDetails from "./BookDetails";

class CheckedOutList extends Component {
  constructor() {
    super();
    this.state = {
      checkedout: books
    };
  }

  render() {
    return (
      <div>
        <h1>Checked Out</h1>
        <input placeholder="Search checked out" />
        <div>
          {this.state.checkedout.map(book => {
            return <BookDetails book={book} />;
          })}
        </div>
      </div>
    );
  }
}

export default CheckedOutList;
