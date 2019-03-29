import axios from "axios";

export const FETCHING_USERS = "FETCHING_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";

export const GETTING_LOGGED_IN_USER = "GETTING_LOGGED_IN_USER";
export const GET_LOGGED_IN_USER_SUCCESS = "GET_LOGGED_IN_USER_SUCCESS";

export const UPDATING_PROFILE = "UPDATING_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";

export const ADDING_BOOK = "ADDING_BOOK";
export const ADDING_BOOK_SUCCESS = "ADDING_BOOK_SUCCESS";

export const GETTING_USERS_INVENTORY = "GETTING_USERS_INVENTORY";
export const GET_USERS_INVENTORY_SUCCESS = "GET_USERS_INVENTORY_SUCCESS";

export const GETTING_SINGLE_INVENTORY = "GETTING_SINGLE_INVENTORY";
export const GET_SINGLE_INVENTORY_SUCCESS = "GET_SINGLE_INVENTORY_SUCCESS";

export const GETTING_SINGLE_CHECKED_OUT_BOOK = "GETTING_SINGLE_CHECKED_OUT_BOOK";
export const GET_SINGLE_CHECKED_OUT_BOOK_SUCCESS = "GET_SINGLE_CHECKED_OUT_BOOK_SUCCESS";

export const GETTING_SINGLE_BOOK = "GETTING_SINGLE_BOOK";
export const GET_SINGLE_BOOK_SUCCESS = "GET_SINGLE_BOOK_SUCCESS";

export const FETCHING_BOOKS = "FETCHING_BOOKS";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";

// const baseUrl = "http://localhost:9001";
const baseUrl = "https://book-maps.herokuapp.com";

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

export const getBooks = state => dispatch => {
  dispatch({ type: FETCHING_BOOKS });
  axios
    .get(`${baseUrl}/books`)
    .then(res => {
      dispatch({
        type: FETCH_BOOKS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

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
export const addNewBook = state => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: ADDING_BOOK });
  axios
    .post(`${baseUrl}/users/${userId}/inventory`, state)
    .then(res => {
      dispatch({
        type: ADDING_BOOK_SUCCESS,
        payload: res.data.newBook
      });
    })
    .catch(err => console.log(err));
};
export const getAllInventory = () => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: GETTING_USERS_INVENTORY });
  axios
    .get(`${baseUrl}/users/${userId}/inventory`)
    .then(res => {
      dispatch({
        type: GET_USERS_INVENTORY_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
export const getSingleInventory = bookId => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: GETTING_SINGLE_INVENTORY });
  axios
    // .get(`${baseUrl}/${userId}/inventory/1`)
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

export const getSingleCheckedOutBook = checkedOutId => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: GETTING_SINGLE_CHECKED_OUT_BOOK });
  axios
    .get(`${baseUrl}/users/${userId}/checkedOut/${checkedOutId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_CHECKED_OUT_BOOK_SUCCESS,
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
