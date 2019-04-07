import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addNewBook } from "../../redux/actions/bookActions.js";
import { connect } from "react-redux";
import Ratings from "react-ratings-declarative";

import Loading from "../Loading/Loading.js";
class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.book.title,
      authors: this.props.book.authors,
      image: this.props.book.covers[0],
      description: "",
      avgRating: parseFloat(this.props.book.average_rating[0])
    };
  }
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  addBook = () => {
    this.props.addNewBook(this.state);
  };
  componentWillReceiveProps(newProps) {
    if (newProps.fetchingBooks === false) {
      this.props.history.push("/my-library");
    }
  }
  render() {
    if (this.props.fetchingBooks) {
      return <Loading />;
    } else {
      return (
        <div>
          <h2>Add a description of your copy.</h2>
          <img src={this.state.image} alt="cool" />
          <h2>{this.state.title}</h2>
          <h3>By {this.state.authors}</h3>
          <div>
            <Ratings rating={this.state.avgRating} widgetRatedColors="gold">
              <Ratings.Widget widgetHoverColor="gold" />
              <Ratings.Widget widgetHoverColor="gold" />
              <Ratings.Widget widgetHoverColor="gold" />
              <Ratings.Widget widgetHoverColor="gold" />
              <Ratings.Widget widgetHoverColor="gold" />
            </Ratings>
            <div>Goodreads rating: {this.state.avgRating}</div>
          </div>
          <input
            type="text"
            name="description"
            placeholder="A description of your copy"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <button onClick={this.addBook}>Add book to your library!</button>
          <button onClick={() => this.props.cancelAdd()}>Cancel</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  fetchingBooks: state.bookReducer.fetchingBooks,
  books: state.bookReducer.books
});
const AddBookRedux = connect(
  mapStateToProps,
  { addNewBook }
)(AddBook);

export default withRouter(AddBookRedux);
