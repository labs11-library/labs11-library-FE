import React, { Component } from "react";
import Ratings from "react-ratings-declarative";

import { connect } from "react-redux";
import { addNewReview } from "../redux/actions/reviewActions";

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewText: "",
      rating: 5,
      reviewEvent: null
    };
  }

  componentDidMount() {
    this.setState({
      reviewEvent: this.props.reviewEvent
    });
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
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNewReview(this.state);
  };

  render() {
    console.log("this.state review-form", this.state);
    return (
      <div>
        <form>
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
          <button onClick={this.handleSubmit}>Submit review</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.reviewReducer.fetchingReviews
});

export default connect(
  mapStateToProps,
  { addNewReview }
)(ReviewForm);
