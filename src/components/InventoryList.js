import React, { Component } from "react";
import books from "../data";
import BookDetails from "./BookDetails";

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      inventory: books
    };
  }

  render() {
    return (
      <div>
        <h1>Inventory</h1>
        <input placeholder="Search inventory" />
        <div>
          {this.state.inventory.map(book => {
            return <BookDetails book={book} />;
          })}
        </div>
      </div>
    );
  }
}

export default Inventory;
