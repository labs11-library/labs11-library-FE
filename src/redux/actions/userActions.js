import axios from "axios";
import baseUrl from "../../url";
import { getLoggedInUser } from "./authActions";
// const baseUrl = "http://localhost:9001";
// const baseUrl = "https://book-maps.herokuapp.com";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const getUsers = state => dispatch => {
  dispatch({ type: FETCHING_USERS });
  axios
    .get(`${baseUrl}/users`)
    .then(res => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//------------------------ Stripe Payment --------------------------------//

export const CREATE_CUSTOMER_START = "CREATE_CUSTOMER_START";
export const CREATE_CUSTOMER_SUCCESS = "CREATE_CUSTOMER_SUCCESS";
export const CREATE_CUSTOMER_FAILURE = "CREATE_CUSTOMER_FAILURE";

export const createCustomer = () => dispatch => {
  dispatch({ type: CREATE_CUSTOMER_START });
  axios
    .post(`${baseUrl}/payment/create_customer`)
    .then(res => {
      dispatch({
        type: CREATE_CUSTOMER_SUCCESS,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(getLoggedInUser());
    })
    .catch(err => console.log(err));
};
