import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { addNewBook } from "../../redux/actions";
import { connect } from "react-redux";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.book.title,
      authors: this.props.book.authors,
      image: this.props.book.covers[0],
      description: ""
    };
  }
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  addBook = (e) => {
    e.preventDefault();
    this.props.addNewBook(this.state);
    this.props.history.push('/inventory')
    console.log(this.props.books);
  };
  render() {
    return (
      <div>
        <h2>Add a description of your copy.</h2>
        <img src={this.state.image} alt="cool" />
        <h2>{this.state.title}</h2>
        <h3>By {this.state.authors}</h3>
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

const mapStateToProps = state => ({
  loading: state.loading,
  books: state.books
});
const AddBookRedux =  connect(
  mapStateToProps,
  { addNewBook }
)(AddBook);

export default withRouter(AddBookRedux)
