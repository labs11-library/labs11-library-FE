import axios from "axios";
import baseUrl from "../../url";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const FETCHING_SINGLE_USER = "FETCHING_SINGLE_USER";
export const FETCH_SINGLE_USER_SUCCESS = "FETCH_SINGLE_USER_SUCCESS";

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

export const getSingleUser = userId => dispatch => {
  dispatch({ type: FETCHING_SINGLE_USER });
  axios
    .get(`${baseUrl}/users/${userId}`)
    .then(res => {
      dispatch({
        type: FETCH_SINGLE_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//------------------------ Stripe Payment --------------------------------//

export const CREATE_CUSTOMER_START = "CREATE_CUSTOMER_START";
export const CREATE_CUSTOMER_SUCCESS = "CREATE_CUSTOMER_SUCCESS";
export const CREATE_CUSTOMER_FAILURE = "CREATE_CUSTOMER_FAILURE";

export const createCustomer = token => dispatch => {
  dispatch({ type: CREATE_CUSTOMER_START });
  axios
    .post(`${baseUrl}/payment/create_customer`, token)
    .then(res => {
      dispatch({
        type: CREATE_CUSTOMER_SUCCESS
        // payload: res.data
        // console.log(payload);
      });
    })
    // .then(() => {
    //   dispatch(getLoggedInUser());
    // })
    .catch(err => console.log(err));
};
