import React, { Component } from "react";
import BookDetails from "./BookDetails";
import Distance from "./Distance";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { connect } from "react-redux";
import { getBooks } from "../../redux/actions/bookActions.js";

import Loading from "../Loading/Loading.js";
import {
  BookListContainer,
  CardContainer,
  NoBooks,
  NoBooksLink
} from "../Styles/LandingPageStyles.js";
class Books extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      filter: "available",
      searchText: "",
      showSlider: false
    };
  }

  componentDidMount() {
    this.props.getBooks();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  searchBooks = () => {
    const { searchText } = this.state;
    const { books } = this.props;

    if (searchText.length === 0) {
      return books;
    } else if (searchText.length > 0) {
      const newText = this.state.searchText.replace(/\\$/, "");
      const searchRegex = new RegExp(newText, "gi");
      // const searchRegex = new RegExp(searchText, "gi");
      return books.filter(
        book =>
          book.title.match(searchRegex) ||
          book.authors.match(searchRegex) ||
          book.lender.match(searchRegex)
      );
    }
  };
  handleSelect = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (value === "distance") {
      this.setState({ showSlider: true });
    } else this.setState({ showSlider: false });
  };
  filteredBooks = () => {
    const { filter } = this.state;
    if (filter === "all") {
      return this.searchBooks().filter(
        book => book.lenderId.toString() !== localStorage.getItem("userId")
      );
    } else if (filter === "available") {
      return this.searchBooks().filter(
        book =>
          book.available === true &&
          book.lenderId.toString() !== localStorage.getItem("userId")
      );
    } else if (filter === "mybooks") {
      return this.searchBooks().filter(
        book => book.lenderId.toString() === localStorage.getItem("userId")
      );
    } else if (filter === "distance") {
      return this.searchBooks().filter(
        book => book.lenderId.toString() !== localStorage.getItem("userId")
      );
    }
  };

  render() {
    let none;
    if (this.props.fetchingBooks) {
      return <Loading />;
    } else {
      return (
        <BookListContainer>
          <Paper
            style={{
              margin: "20px auto",
              width: "85%",
              padding: "2px 4px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <InputBase
              placeholder="Search by title, author, or owner"
              type="text"
              name="searchText"
              value={this.state.searchText}
              onChange={this.handleChange}
              style={{ marginLeft: "8px", flex: "1" }}
            />
            <IconButton aria-label="Search" style={{ padding: "10px" }}>
              <SearchIcon />
            </IconButton>
          </Paper>
          <div>
            <InputLabel style={{ padding: "10px" }}>Filter by:</InputLabel>
            <Select
              style={{ minWidth: "100px", marginBottom: "10px" }}
              label={this.state.filter}
              value={this.state.filter}
              inputProps={{
                name: "filter"
              }}
              onChange={this.handleSelect}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"available"}>Available</MenuItem>
              <MenuItem value={"distance"}>Distance</MenuItem>
              <MenuItem value={"mybooks"}>My Books</MenuItem>
            </Select>
          </div>
          {this.state.showSlider ? <Distance /> : none}
          {/* <Distance /> */}
          {this.state.searchText.length > 0 &&
            this.filteredBooks().length === 0 && (
              <>
                <NoBooks>Nobody has posted this book yet.</NoBooks>
                <NoBooksLink to="/add-book">
                  Be the first to post it to BookMaps.
                </NoBooksLink>
              </>
            )}
          <CardContainer>
            {this.filteredBooks().map(book => {
              return <BookDetails key={book.bookId} book={book} />;
            })}
          </CardContainer>
        </BookListContainer>
      );
    }
  }
}

const mapStateToProps = state => ({
  fetchingBooks: state.bookReducer.fetchingBooks,
  books: state.bookReducer.books
});
export default connect(
  mapStateToProps,
  { getBooks }
)(Books);
