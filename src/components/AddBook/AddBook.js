import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addNewBook } from "../../redux/actions/bookActions.js";
import { connect } from "react-redux";
import Ratings from "react-ratings-declarative";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Loading from "../Loading/Loading.js";
import styled from "styled-components";

const AddBookWrapper = styled.div`
  @media (max-width: 500px) {
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  margin: 20px auto;
  max-width: 450px;
  width: 100%;
`;

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
    color: #009ee5;
  }

  p {
    font-size: 1rem;
    margin-top: 1rem;
    color: #838281;
  }
`;

const AddBookRating = styled.div`
  padding-top: 10px;

  p {
    font-size: 1rem;
  }
`;

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.book.title,
      authors: this.props.book.authors,
      image: this.props.book.covers[0],
      description: "",
      avgRating: parseFloat(this.props.book.average_rating[0]),
      errorGiven: false
    };
  }
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errorGiven: false
    });
  };
  handleError = () => {
    this.setState({ errorGiven: true });
  };
  addBook = () => {
    this.props.addNewBook({
      title: this.state.title,
      authors: this.state.authors,
      image: this.state.image,
      description: this.state.description,
      avgRating: this.state.avgRating
    });
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
            <p style={{ color: "#838281", marginTop: "0.5rem" }}>
              Goodreads rating: {this.state.avgRating}
            </p>
          </AddBookRating>
          <div>
            <TextField
              label="Provide a description"
              name="description"
              multiline
              fullWidth
              value={this.state.description}
              onChange={this.handleChange}
              required
              error={this.state.errorGiven}
              autoFocus
              style={{
                padding: "5px 5px 5px 0px",
                width: "100%",
                marginRight: "100px"
              }}
            />
          </div>
          {this.state.description.length > 0 ? (
            <div>
              <Button
                variant="contained"
                onClick={this.addBook}
                style={{ margin: "5px" }}
                color="primary"
              >
                Add To My Library
              </Button>
              <Button
                variant="outlined"
                onClick={() => this.props.cancelAdd()}
                style={{ margin: "5px" }}
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                onClick={this.handleError}
                style={{ margin: "5px" }}
                color="primary"
              >
                Add To My Library
              </Button>
              <Button
                variant="outlined"
                onClick={() => this.props.cancelAdd()}
                style={{ margin: "5px" }}
                color="secondary"
              >
                Cancel
              </Button>
            </div>
          )}
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
