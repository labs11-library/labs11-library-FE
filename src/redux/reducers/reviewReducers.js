import {
  FETCHING_USER_REVIEWS,
  FETCHING_USER_REVIEWS_SUCCESS,
  GETTING_SINGLE_REVIEW,
  GET_SINGLE_REVIEW_SUCCESS,
  ADDING_REVIEW,
  ADDING_REVIEW_SUCCESS
} from "../actions/reviewActions";

const initialState = {
  fetchingReviews: false,
  reviews: []
}

export default function reviewReducer(state = initialState, action) {
  switch(action.type) {
    case FETCHING_USER_REVIEWS:
      return {
        ...state,
        fetchingReviews: true
      };
    case FETCHING_USER_REVIEWS_SUCCESS:
      return {
        ...state,
        fetchingReviews: false,
        reviews: action.payload
      }
    case GETTING_SINGLE_REVIEW:
      return {
        ...state,
        fetchingReviews: true
      }
    case GET_SINGLE_REVIEW_SUCCESS:
      return {
        ...state,
        fetchingReviews: false,
        reviews: action.payload
      }
    case ADDING_REVIEW:
      return {
        ...state,
        fetchingReviews: true,
      }
    case ADDING_REVIEW_SUCCESS:
      return {
        ...state,
        fetchingReviews: false,
        reviews: action.payload
      }
    default:
      return state;
  }
}