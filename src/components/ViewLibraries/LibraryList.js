import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllInventory } from "../../redux/actions/inventoryActions.js";
import { getSingleUser } from "../../redux/actions/userActions.js";
import LibraryDetails from "./LibraryDetails";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Loading from "../Loading/Loading.js";
import {
  InventoryContainer,
  CardContainer
} from "../Styles/InventoryStyles.js";
import SingleUserProfileCard from "../Profile/SingleUserProfileCard";
import { getLoggedInUser } from "../../redux/actions/authActions.js";

class LibraryList extends Component {
  constructor() {
    super();
    this.state = {
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
    if (this.state.searchText.length === 0) {
      return this.props.inventory;
    } else if (this.state.searchText.length > 0) {
      const searchRegex = new RegExp(this.state.searchText, "gi");
      return this.props.inventory.filter(
        book => book.title.match(searchRegex) || book.authors.match(searchRegex)
      );
    }
  };
  viewBook = bookId => {
    let userId = localStorage.getItem("userId");
    this.props.params.history.push(`${userId}/library/${bookId}`);
  };
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.getAllInventory(userId);
    this.props.getSingleUser(userId);
    // this.props.getLoggedInUser();
  }
  render() {
    const { singleUser } = this.props;
    if (this.props.loadingInventory || this.props.loadingUser) {
      return <Loading />;
    } else if (this.props.inventory.length === 0) {
      const { firstName, lastName } = this.props.singleUser;
      return (
        <h1>
          There are no books in {firstName} {lastName}'s library.
        </h1>
      );
    } else {
      const { firstName } = this.props.singleUser;
      return (
        <InventoryContainer>
          <SingleUserProfileCard singleUser={singleUser} />
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
              placeholder={`Search ${firstName}'s Library`}
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
          <CardContainer>
            {this.searchBooks().map(book => {
              return (
                <LibraryDetails
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
  inventory: state.inventoryReducer.inventory,
  singleUser: state.userReducer.singleUser,
  loadingUser: state.userReducer.loadingUsers
});
export default connect(
  mapStateToProps,
  { getAllInventory, getSingleUser, getLoggedInUser }
)(LibraryList);
