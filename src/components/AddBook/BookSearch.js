import React, { Component } from "react";
import axios from "axios";
import backendBaseUrl from '../../url'

import SearchedBookTile from "./SearchedBookTile";
import AddBook from "./AddBook";
export default class BookSearch extends Component {
  state = {
    searchText: "",
    searchResults: [],
    selectedBook: {
      title: "",
      authors: "",
      image: "",
      description: ""
    },
    isAdding: false
  };
  baseUrl = `${backendBaseUrl}/books/search`;
  addBook = selectedBook => {
    this.setState({ isAdding: true, selectedBook: selectedBook });
  };
  cancelAdd = e => {
    this.setState({ isAdding: false });
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        if (value === "") {
          this.setState({ searchResults: [] });
        } else {
          axios
            .post(this.baseUrl, {
              title: this.state.searchText
            })
            .then(res => {
              this.setState({
                searchResults: res.data.books
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    );
  };
  firstTenBooks = () => {
    let firstTen = [];
    for (let i = 0; i < 10; i++) {
      firstTen.push(this.state.searchResults[i]);
    }
    return firstTen;
  };
  render() {
    if (this.state.isAdding) {
      return (
        <AddBook book={this.state.selectedBook} cancelAdd={this.cancelAdd} />
      );
    } else {
      return (
        <div>
          <input
            type="text"
            name="searchText"
            value={this.state.searchText}
            onChange={this.handleChange}
          />
          {this.firstTenBooks().map((book, id) => {
            console.log(book)
            return <SearchedBookTile key={id} book={book} addBook={this.addBook} />;
          })}
        </div>
      );
    }
  }
}
