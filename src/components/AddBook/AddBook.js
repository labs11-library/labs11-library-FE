import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addNewBook } from "../../redux/actions/bookActions.js";
import { connect } from "react-redux";
import Ratings from "react-ratings-declarative";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loading from "../Loading/Loading.js";
import styled from "styled-components";

const AddBookWrapper = styled.div`
  margin: 20px auto;
  width: 450px;
`

const AddBookContentWrapper = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    text-align: left;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
`

const AddBookRating = styled.div`
  padding-top: 10px;

  p {
    font-size: 1rem;
  }
`

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
        <AddBookWrapper>
          <AddBookContentWrapper>
            <img src={this.state.image} alt="cool" />
            <div>
              <h2>{this.state.title}</h2>
              <p>By {this.state.authors}</p>
            </div>
          </AddBookContentWrapper>
          <AddBookRating>
            <Ratings rating={this.state.avgRating} widgetRatedColors="gold">
              <Ratings.Widget widgetHoverColor="gold" widgetDimension="45px" />
              <Ratings.Widget widgetHoverColor="gold" widgetDimension="45px" />
              <Ratings.Widget widgetHoverColor="gold" widgetDimension="45px" />
              <Ratings.Widget widgetHoverColor="gold" widgetDimension="45px" />
              <Ratings.Widget widgetHoverColor="gold" widgetDimension="45px" />
            </Ratings>
            <p>Goodreads rating: {this.state.avgRating}</p>
          </AddBookRating>
          <div>
            <TextField
              label="Add a description"
              name="description"
              multiline
              fullWidth
              value={this.state.description}
              onChange={this.handleChange}
              style={{padding: "5px", width: "350px"}}
            />
          </div>
          <div>
            <Button 
              variant="outlined" 
              onClick={this.addBook}
              style={{margin: "5px"}}
              color="primary"
            >
              Add book to your library
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => this.props.cancelAdd()}
              style={{margin: "5px"}}
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </AddBookWrapper>
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
