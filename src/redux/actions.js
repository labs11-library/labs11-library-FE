import axios from "axios";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const GETTING_FIRST_USER = "GETTING_FIRST_USER";
export const GET_FIRST_USER_SUCCESS = "GET_FIRST_USER_SUCCESS";

export const UPDATING_PROFILE = "UPDATING_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";

export const ADDING_BOOK = "ADDING_BOOK";
export const ADDING_BOOK_SUCCESS = "ADDING_BOOK_SUCCESS";

// const baseUrl = "http://localhost:9001";
const baseUrl = "https://book-maps.herokuapp.com";

export const GETTING_SINGLE_INVENTORY = "GETTING_SINGLE_INVENTORY";
export const GET_SINGLE_INVENTORY_SUCCESS = "GET_SINGLE_INVENTORY_SUCCESS";

export const GETTING_SINGLE_BOOK = "GETTING_SINGLE_BOOK";
export const GET_SINGLE_BOOK_SUCCESS = "GET_SINGLE_BOOK_SUCCESS";

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
export const addNewBook = state => dispatch => {
  dispatch({ type: ADDING_BOOK });
  axios
    .post(`${baseUrl}/users/366/inventory`, state)
    .then(res => {
      dispatch({
        type: ADDING_BOOK_SUCCESS,
        payload: res.data.newBook
      });
    })
    .catch(err => console.log(err));
};
export const getSingleInventory = (userId, bookId) => dispatch => {
  dispatch({ type: GETTING_SINGLE_INVENTORY });
  axios
    .get(`${baseUrl}/users/${userId}/inventory/${bookId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_INVENTORY_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSingleBook = bookId => dispatch => {
  dispatch({ type: GETTING_SINGLE_BOOK });
  axios
    .get(`${baseUrl}/books/${bookId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_BOOK_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
