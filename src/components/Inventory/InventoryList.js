import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllInventory } from "../../redux/actions/inventoryActions.js";
import InventoryDetails from "./InventoryDetails.js";
import Auth from "../Auth/Auth";
import Loading from "../Loading/Loading.js";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import $ from "jquery";
import {
  InventoryContainer,
  CardContainer
} from "../Styles/InventoryStyles.js";
class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      searchText: ""
    };
  }
  handleChange = e => {
    // if (e.keyCode === 191) {
    //   return null
    // }
    const { name, value } = e.target;
    
    this.setState({
      [name]: value
    });
  }


  searchBooks = () => {
    if (this.state.searchText.length === 0) {
      return this.props.inventory;
    } else if (this.state.searchText.length > 0) {
      const newText = this.state.searchText.replace(/\\$/, "")
      const searchRegex = new RegExp(newText, "gi");
      return this.props.inventory.filter(
        book => book.title.match(searchRegex) || book.authors.match(searchRegex)
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
  render() {
    if (this.props.addingBook || this.props.loadingInventory) {
      return <Loading />;
    } else if (this.props.inventory.length === 0) {
      return <h1>You have no books in your library.</h1>;
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
          <CardContainer>
            {this.searchBooks().map(book => {
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
  addingBook: state.bookReducer.fetchingBooks,
  inventory: state.inventoryReducer.inventory
});
export default connect(
  mapStateToProps,
  { getAllInventory }
)(Auth(Inventory));
