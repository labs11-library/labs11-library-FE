import axios from "axios";
import baseUrl from "../../url";

export const GETTING_CHECKOUT_REQUESTS = "GETTING_CHECKOUT_REQUESTS";
export const GET_CHECKOUT_REQUESTS_SUCCESS = "GET_CHECKOUT_REQUESTS_SUCCESS";

export const GETTING_SINGLE_REQUEST = "GETTING_SINGLE_REQUEST";
export const GET_SINGLE_REQUEST_SUCCESS = "GET_SINGLE_REQUEST_SUCCESS";

export const ADDING_CHECKOUT_REQUEST = "ADDING_CHECKOUT_REQUEST";
export const ADD_CHECKOUT_REQUEST_SUCCESS = "ADD_CHECKOUT_REQUEST_SUCCESS";
export const ADD_CHECKOUT_REQUEST_FAILURE = "ADD_CHECKOUT_REQUEST_FAILURE";

export const ADDING_CHECKOUT = "ADDING_CHECKOUT";
export const ADD_CHECKOUT_SUCCESS = "ADD_CHECKOUT_SUCCESS";

export const GETTING_CHECKOUTS = "GETTING_CHECKOUTS";
export const GET_CHECKOUTS_SUCCESS = "GET_CHECKOUTS_SUCCESS";

export const GETTING_SINGLE_CHECKOUT = "GETTING_SINGLE_CHECKOUT";
export const GET_SINGLE_CHECKOUT_SUCCESS = "GET_SINGLE_CHECKOUT_SUCCESS";

export const DELETING_CHECKOUT_REQUEST = "DELETING_CHECKOUT_REQUEST";
export const DELETE_CHECKOUT_REQUEST_SUCCESS =
  "DELETE_CHECKOUT_REQUEST_SUCCESS";

export const DELETING_CHECKOUT = "DELETING_CHECKOUT";
export const DELETE_CHECKOUT_SUCCESS = "DELETE_CHECKOUT_SUCCESS";

export const SETTING_LATE_FEE = 'SETTING_LATE_FEE'
export const SET_LATE_FEE_SUCCESS = 'SET_LATE_FEE_SUCCESS'

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
    .catch(err =>
      dispatch({ type: ADD_CHECKOUT_REQUEST_FAILURE, payload: err })
    );
};
export const deleteCheckoutRequest = (
  lenderId,
  checkoutRequestId
) => dispatch => {
  dispatch({ type: DELETING_CHECKOUT_REQUEST });
  axios
    .delete(`${baseUrl}/users/${lenderId}/checkoutrequest/${checkoutRequestId}`)
    .then(res => {
      dispatch({
        type: DELETE_CHECKOUT_REQUEST_SUCCESS
      });
    })
    .catch(err => console.log(err));
};
export const addCheckout = (userId, checkoutRequestId) => dispatch => {
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

export const getSingleCheckout = (userId, checkoutId) => dispatch => {
  dispatch({ type: GETTING_SINGLE_CHECKOUT });
  axios
    .get(`${baseUrl}/users/${userId}/checkout/${checkoutId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_CHECKOUT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const confirmReturn = checkoutId => dispatch => {
  const userId = localStorage.getItem("userId");
  dispatch({ type: DELETING_CHECKOUT });
  axios
    .put(`${baseUrl}/users/${userId}/checkOut/${checkoutId}`, {
      returned: true
    })
    .then(res => {
      dispatch({
        type: DELETE_CHECKOUT_SUCCESS
      });
    })
    .catch(err => console.log(err));
};

export const setLateFee = (checkoutId, lateFee) => dispatch => {
  dispatch({type: SETTING_LATE_FEE})
  const userId = localStorage.getItem("userId");
  axios
  .put(`${baseUrl}/users/${userId}/checkOut/${checkoutId}`, {
    lateFee: lateFee
  })
  .then(res => {
    dispatch({type: SET_LATE_FEE_SUCCESS})
  })
  .catch(err => console.log(err));
}