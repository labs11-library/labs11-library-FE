import axios from "axios";
import baseUrl from "../../url";
// const baseUrl = "http://localhost:9001";
// const baseUrl = "https://book-maps.herokuapp.com";

export const FETCHING_BOOKS = "FETCHING_BOOKS";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";

export const GETTING_SINGLE_BOOK = "GETTING_SINGLE_BOOK";
export const GET_SINGLE_BOOK_SUCCESS = "GET_SINGLE_BOOK_SUCCESS";

export const ADDING_BOOK = "ADDING_BOOK";
export const ADDING_BOOK_SUCCESS = "ADDING_BOOK_SUCCESS";

export const GETTING_SINGLE_CHECKED_OUT_BOOK =
  "GETTING_SINGLE_CHECKED_OUT_BOOK";
export const GET_SINGLE_CHECKED_OUT_BOOK_SUCCESS =
  "GET_SINGLE_CHECKED_OUT_BOOK_SUCCESS";

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
