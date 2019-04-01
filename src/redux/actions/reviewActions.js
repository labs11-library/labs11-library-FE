import axios from "axios";
import baseUrl from "../../url";

export const FETCHING_USER_REVIEWS = "FETCHING_USER_REVIEWS";
export const FETCH_USER_REVIEWS_SUCCESS = "FETCH_USER_REVIEWS_SUCCESS";

export const GETTING_SINGLE_REVIEW = "GETTING_SINGLE_REVIEW";
export const GET_SINGLE_REVIEW_SUCCESS = "GET_SINGLE_REVIEW_SUCCESS";

export const ADDING_REVIEW = "ADDING_REVIEW";
export const ADDING_REVIEW_SUCCESS = "ADDING_REVIEW_SUCCESS";

export const getUserReviews = state => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: FETCHING_USER_REVIEWS });
  axios
    .get(`${baseUrl}/${userId}/reviews`)
    .then(res => {
      dispatch({
        type: FETCH_USER_REVIEWS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getSingleReview = reviewId => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: GETTING_SINGLE_REVIEW });
  axios
    .get(`${baseUrl}/${userId}/reviews/${reviewId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_REVIEW_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addNewReview = state => dispatch => {
  dispatch({ type: ADDING_REVIEW });
  axios
    .post(`${baseUrl}/users/reviews`, state)
    .then(res => {
      dispatch({
        type: ADDING_REVIEW_SUCCESS,
        payload: res.data.newReview
      });
    })
    .catch(err => console.log(err));
};
