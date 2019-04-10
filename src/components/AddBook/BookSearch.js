import React, { Component } from "react";
import axios from "axios";
import backendBaseUrl from "../../url";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SearchedBookTile from "./SearchedBookTile";
import AddBook from "./AddBook";
import Auth from "../Auth/Auth";
import {
  InventoryContainer,
  CardContainer
} from "../Styles/InventoryStyles.js";
import goodreadsLogo from "../../images/goodreads-logo.png";
class BookSearch extends Component {
  state = {
    searchText: "",
    searchResults: [],
    selectedBook: {
      title: "",
      authors: "",
      image: "",
      description: "",
      average_rating: null
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
          <InventoryContainer>
            <Paper
              style={{
                width: "400px",
                margin: "20px auto 50px auto",
                padding: "2px 4px",
                display: "flex",
                alignItems: "center",
                position: "relative"
                // top: "3.5vw"
              }}
            >
              <InputBase
                placeholder="Enter the title or author of the book you own"
                type="text"
                name="searchText"
                value={this.state.searchText}
                onChange={this.handleChange}
                style={{ marginLeft: "8px", flex: "1" }}
              />
              <IconButton aria-label="Search" style={{ padding: "10px" }}>
                <ArrowForwardIcon />
              </IconButton>
            </Paper>
            <div
              style={{
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                position: "relative",
                top: "0.5vw"
              }}
            >
              <span>Powered by</span>
              <img
                src={goodreadsLogo}
                alt="goodreads logo"
                style={{ height: "14px", width: "auto", paddingLeft: "5px" }}
              />
            </div>
            <CardContainer>
              {this.firstTenBooks().map((book, id) => {
                return (
                  <SearchedBookTile
                    key={id}
                    book={book}
                    addBook={this.addBook}
                  />
                );
              })}
            </CardContainer>
          </InventoryContainer>
        </div>
      );
    }
  }
}

export default Auth(BookSearch);
