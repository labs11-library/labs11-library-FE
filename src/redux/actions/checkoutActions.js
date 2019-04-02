import axios from "axios";
import baseUrl from "../../url";

export const GETTING_CHECKOUT_REQUESTS = "GETTING_CHECKOUT_REQUESTS";
export const GET_CHECKOUT_REQUESTS_SUCCESS = "GET_CHECKOUT_REQUESTS_SUCCESS";

export const getCheckoutRequests = () => dispatch => {
  const userId = localStorage.getItem("userId");
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
