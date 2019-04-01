import axios from "axios";
import baseUrl from "../../url";
// const baseUrl = "http://localhost:9001";
// const baseUrl = "https://book-maps.herokuapp.com";

export const GETTING_LOGGED_IN_USER = "GETTING_LOGGED_IN_USER";
export const GET_LOGGED_IN_USER_SUCCESS = "GET_LOGGED_IN_USER_SUCCESS";

export const UPDATING_PROFILE = "UPDATING_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";

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

export const editProfile = updatedUser => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: UPDATING_PROFILE });
  axios
    .put(`${baseUrl}/users/${userId}`, updatedUser)
    .then(res => {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data.editedUser
      });
    })
    .catch(err => {
      console.log(err);
    });
};
