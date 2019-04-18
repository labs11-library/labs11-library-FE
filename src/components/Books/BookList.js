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
import { getLoggedInUser } from "../../redux/actions/authActions.js";

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
      miles: 25
    };
  }

  componentDidMount() {
    this.props.getBooks();
    this.props.getLoggedInUser();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  distanceChange = (event, miles) => {
    this.setState({ miles });
  };
  distance = (lat1, lon1, lat2, lon2, miles) => {
    if (lat1 == lat2 && lon1 == lon2) {
      return true;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;

      if (dist < miles) {
        return true;
      } else {
        return false;
      }
    }
  };

  //========================= Proximity & Quicksort===========================//
  proximity = (lat1, lon1, lat2, lon2, miles) => {
    if (lat1 == lat2 && lon1 == lon2) {
      return 1;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var prox =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (prox > 1) {
        prox = 1;
      }
      prox = Math.acos(prox);
      prox = (prox * 180) / Math.PI;
      prox = prox * 60 * 1.1515;
      return prox;
    }
  };
  //===========================================================================//

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
  };
  filteredBooks = () => {
    const { filter } = this.state;
    if (filter === "all") {
      let newArr = this.searchBooks().filter(book => {
        if (
          book.latitude &&
          book.longitude &&
          book.lenderId.toString() !== localStorage.getItem("userId")
        ) {
          return (
            this.distance(
              book.latitude,
              book.longitude,
              this.props.loggedInUser.latitude,
              this.props.loggedInUser.longitude,
              this.state.miles
            ) === true
          );
        }
      });
      return newArr;
    } else if (filter === "available") {
      let newArr = this.searchBooks().filter(book => {
        if (
          book.latitude &&
          book.longitude &&
          book.available === true &&
          book.lenderId.toString() !== localStorage.getItem("userId")
        ) {
          return (
            this.distance(
              book.latitude,
              book.longitude,
              this.props.loggedInUser.latitude,
              this.props.loggedInUser.longitude,
              this.state.miles
            ) === true
          );
        }
      });
      return newArr;
    }
  };

  render() {
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
              alignItems: "center",
              maxWidth: "400px"
            }}
          >
            <InputBase
              placeholder="Search for books by title, author, or owner"
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
            </Select>
          </div>
          <Distance
            distanceChange={this.distanceChange}
            miles={this.state.miles}
          />
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
  books: state.bookReducer.books,
  loggedInUser: state.authReducer.loggedInUser
});
export default connect(
  mapStateToProps,
  { getBooks, getLoggedInUser }
)(Books);
