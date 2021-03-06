import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllInventory } from "../../redux/actions/inventoryActions.js";
import InventoryDetails from "./InventoryDetails.js";
import Auth from "../Auth/Auth";
import Loading from "../Loading/Loading.js";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import {
  InventoryContainer,
  CardContainer,
  NoBooksLibrary
} from "../Styles/InventoryStyles.js";
import { NoBooks, NoBooksLink } from "../Styles/LandingPageStyles.js";
class Inventory extends Component {
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

  handleSelect = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  searchBooks = () => {
    if (this.state.searchText.length === 0) {
      return this.props.inventory;
    } else if (this.state.searchText.length > 0) {
      const newText = this.state.searchText.replace(/\\$/, "");
      const searchRegex = new RegExp(newText, "gi");
      return this.props.inventory.filter(
        book => book.title.match(searchRegex) || book.authors.match(searchRegex)
      );
    }
  };
  filteredBooks = () => {
    const { filter } = this.state;

    if (filter === "all") {
      return this.searchBooks().filter(function(book) {
        return book.userId.toString() === localStorage.getItem("userId");
      });
    } else if (filter === "available") {
      return this.searchBooks().filter(
        book =>
          book.available === true &&
          book.userId.toString() === localStorage.getItem("userId")
      );
    }
  };
  viewBook = bookId => {
    let userId = localStorage.getItem("userId");
    this.props.params.history.push(`${userId}/inventory/${bookId}`);
  };
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getAllInventory(userId);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.deletingInventory === true) {
      const userId = localStorage.getItem("userId");
      this.props.getAllInventory(userId);
    }
  }
  render() {
    if (
      this.props.addingBook ||
      this.props.loadingInventory ||
      this.props.deletingInventory
    ) {
      return <Loading />;
    } else if (this.props.inventory.length === 0) {
      return (
        <NoBooksLibrary>
          You have no books listed in your library.{" "}
          <Link to="/add-book">Click here</Link> to add books to your library.
        </NoBooksLibrary>
      );
    } else {
      return (
        <InventoryContainer>
          <Paper
            style={{
              width: "80%",
              margin: "20px auto",
              padding: "2px 4px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <InputBase
              placeholder="Search inventory"
              type="text"
              name="searchText"
              value={this.state.searchText}
              onChange={this.handleChange}
              style={{ marginLeft: "8px", flex: "1" }}
              // onKeyPress={this.lettersOnly}
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
          {this.state.searchText.length > 0 &&
            this.filteredBooks().length === 0 && (
              <>
                <NoBooks>You have not posted this book yet.</NoBooks>
                <NoBooksLink to="/add-book">
                  Add it to your library.
                </NoBooksLink>
              </>
            )}
          <CardContainer>
            {this.filteredBooks().map(book => {
              return (
                <InventoryDetails
                  book={book}
                  viewBook={this.viewBook}
                  key={book.bookId}
                />
              );
            })}
          </CardContainer>
        </InventoryContainer>
      );
    }
  }
}

const mapStateToProps = state => ({
  loadingInventory: state.inventoryReducer.loadingInventory,
  deletingInventory: state.inventoryReducer.deletingInventory,
  addingBook: state.bookReducer.fetchingBooks,
  inventory: state.inventoryReducer.inventory
});
export default connect(
  mapStateToProps,
  { getAllInventory }
)(Auth(Inventory));
