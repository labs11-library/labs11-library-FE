import axios from "axios";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const getUsers = state => dispatch => {
  dispatch({ type: FETCHING_USERS });
  axios
    .get("https://book-maps.herokuapp.com/users")
    .then(res => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
