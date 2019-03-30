import axios from "axios";
// const baseUrl = "http://localhost:9001";
const baseUrl = "https://book-maps.herokuapp.com";

export const GETTING_LOGGED_IN_USER = "GETTING_LOGGED_IN_USER";
export const GET_LOGGED_IN_USER_SUCCESS = "GET_LOGGED_IN_USER_SUCCESS";

export const getLoggedInUser = state => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: GETTING_LOGGED_IN_USER });
  axios
    .get(`${baseUrl}/users/${userId}`)
    .then(res => {
      dispatch({
        type: GET_LOGGED_IN_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
