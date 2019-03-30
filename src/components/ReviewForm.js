import React, { Component } from "react";
import { Rating } from 'material-ui-rating'

import { connect } from 'react-redux';
import {addNewReview } from '../redux/actions/reviewActions';

class ReviewForm extends Component {
  constructor() {
    super();
      this.state = {
        reviewText: "",
        rating: 5,
      }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.addNewReview(this.state.rating)
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <input placeholder="Leave a review..." type="textarea" />
              <Rating
                value={this.state.rating}
                max={5}
                onChange={this.handleChangle}
                />
          </form>
      </div>
          
    )
  }
}

const mapStateToProps = state => ({
  loading: state.isLoading
})

export default connect(
  mapStateToProps,
  { addNewReview }
  )(ReviewForm);
