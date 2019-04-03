import axios from "axios";
import baseUrl from "../../url";

export const GETTING_CHECKOUT_REQUESTS = "GETTING_CHECKOUT_REQUESTS";
export const GET_CHECKOUT_REQUESTS_SUCCESS = "GET_CHECKOUT_REQUESTS_SUCCESS";

export const GETTING_SINGLE_REQUEST = "GETTING_SINGLE_REQUEST";
export const GET_SINGLE_REQUEST_SUCCESS = "GET_SINGLE_REQUEST_SUCCESS";

export const ADDING_CHECKOUT_REQUEST = "ADDING_CHECKOUT_REQUEST";
export const ADD_CHECKOUT_REQUEST_SUCCESS = "ADD_CHECKOUT_REQUEST_SUCCESS";

export const ADDING_CHECKOUT = "ADDING_CHECKOUT";
export const ADD_CHECKOUT_SUCCESS = "ADD_CHECKOUT_SUCCESS";

export const GETTING_CHECKOUTS = "GETTING_CHECKOUTS";
export const GET_CHECKOUTS_SUCCESS = "GET_CHECKOUTS_SUCCESS";

export const getCheckoutRequests = userId => dispatch => {
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

export const getSingleCheckoutRequest = (
  userId,
  checkoutRequestId
) => dispatch => {
  dispatch({ type: GETTING_SINGLE_REQUEST });
  axios
    .get(`${baseUrl}/users/${userId}/checkoutRequest/${checkoutRequestId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_REQUEST_SUCCESS,
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

export const addCheckout = checkoutRequestId => dispatch => {
  const userId = localStorage.getItem("userId");
  dispatch({ type: ADDING_CHECKOUT });
  axios
    .post(`${baseUrl}/users/${userId}/checkout`, {
      checkoutRequestId
    })
    .then(res => {
      dispatch({
        type: ADD_CHECKOUT_SUCCESS
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCheckouts = userId => dispatch => {
  dispatch({ type: GETTING_CHECKOUTS });
  axios
    .get(`${baseUrl}/users/${userId}/checkout`)
    .then(res => {
      dispatch({
        type: GET_CHECKOUTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
