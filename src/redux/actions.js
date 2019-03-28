import axios from "axios";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const GETTING_FIRST_USER = "GETTING_FIRST_USER";
export const GET_FIRST_USER_SUCCESS = "GET_FIRST_USER_SUCCESS";

export const UPDATING_PROFILE = "UPDATING_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";

const baseUrl = "http://localhost:9001";
// "https://book-maps.herokuapp.com";

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

export const getFirstUser = state => dispatch => {
  dispatch({ type: GETTING_FIRST_USER });
  // axios.get(`${baseUrl}/users/366`).then(res => {
  //   dispatch({ type: GET_FIRST_USER_SUCCESS, payload: res.data }).catch(err =>
  //     console.log(err)
  //   );
  // });
  axios
    .get(`${baseUrl}/users/366`)
    .then(res => {
      dispatch({
        type: GET_FIRST_USER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const editProfile = updatedUser => dispatch => {
  dispatch({ type: UPDATING_PROFILE });
  axios
    .put(`${baseUrl}/users/366`, updatedUser)
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
