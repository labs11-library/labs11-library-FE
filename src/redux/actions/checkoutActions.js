import axios from "axios";
import baseUrl from "../../url";

export const GETTING_CHECKOUT_REQUESTS = "GETTING_CHECKOUT_REQUESTS";
export const GET_CHECKOUT_REQUESTS_SUCCESS = "GET_CHECKOUT_REQUESTS_SUCCESS";

export const ADDING_CHECKOUT_REQUEST = "ADDING_CHECKOUT_REQUEST";
export const ADD_CHECKOUT_REQUEST_SUCCESS = "ADD_CHECKOUT_REQUEST_SUCCESS";

export const getCheckoutRequests = userId => dispatch => {
  // const userId = localStorage.getItem("userId");
  dispatch({ type: GETTING_CHECKOUT_REQUESTS });
  axios
    .get(`${baseUrl}/users/${userId}/checkoutRequest`)
    .then(res => {
      dispatch({
        type: GET_CHECKOUT_REQUESTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addCheckoutRequest = (bookId, lenderId) => dispatch => {
  const userId = localStorage.getItem("userId");
  dispatch({ type: ADDING_CHECKOUT_REQUEST });
  axios
    .post(`${baseUrl}/users/${userId}/checkoutRequest`, {
      bookId,
      lenderId
    })
    .then(res => {
      dispatch({
        type: ADD_CHECKOUT_REQUEST_SUCCESS
      });
    })
    .catch(err => {
      console.log(err);
    });
};
