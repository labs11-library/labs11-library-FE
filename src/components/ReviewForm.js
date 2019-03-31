import React, { Component } from "react";
import Ratings from 'react-ratings-declarative';

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
    this.setState({
      reviewText: e.target.value
    });
  };

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.addNewReview(this.state.rating)
  }

  render() {
    console.log("this.state review-form", this.state)
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <textarea 
                placeholder="Leave a review..." 
                value={this.state.reviewText} 
                onChange={this.handleChange}
              />
              <Ratings
                rating={this.state.rating}
                widgetRatedColors="gold"
                changeRating={this.changeRating}
              >
                <Ratings.Widget widgetHoverColor="gold" />
                <Ratings.Widget widgetHoverColor="gold" />
                <Ratings.Widget widgetHoverColor="gold" />
                <Ratings.Widget widgetHoverColor="gold" />
                <Ratings.Widget widgetHoverColor="gold" />
              </Ratings>
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
