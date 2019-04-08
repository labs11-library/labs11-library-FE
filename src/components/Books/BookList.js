import React, { Component } from "react";
import BookDetails from "./BookDetails";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { connect } from "react-redux";
import { getBooks } from "../../redux/actions/bookActions.js";

import Loading from "../Loading/Loading.js";
class Books extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      filter: "available",
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
    const { searchText } = this.state;
    const { books } = this.props;
    if (searchText.length === 0) {
      return books;
    } else if (searchText.length > 0) {
      const searchRegex = new RegExp(searchText, "gi");
      return books.filter(
        book => book.title.match(searchRegex) || book.authors.match(searchRegex)
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
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    if (this.props.fetchingBooks) {
      return <Loading />;
    } else {
      return (
        <div>
          <Paper style={{width: "400px", margin: "20px auto", padding: "2px 4px", display: "flex", alignItems: "center"}}>
            <InputBase 
              placeholder="Search books"
              type="text"
              name="searchText"
              value={this.state.searchText}
              onChange={this.handleChange} 
              style={{marginLeft: "8px", flex: "1"}}
            />
            <IconButton aria-label="Search" style={{padding: "10px"}}>
                <SearchIcon />
            </IconButton>
          </Paper>
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
            {this.filteredBooks().map(book => {
              return <BookDetails key={book.bookId} book={book} />;
            })}
          </div>
        </div>
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
