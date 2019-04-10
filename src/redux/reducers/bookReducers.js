import {
  FETCHING_BOOKS,
  FETCH_BOOKS_SUCCESS,
  GETTING_SINGLE_BOOK,
  GET_SINGLE_BOOK_SUCCESS,
  ADDING_BOOK,
  ADDING_BOOK_SUCCESS,
  GETTING_SINGLE_CHECKED_OUT_BOOK,
  GET_SINGLE_CHECKED_OUT_BOOK_SUCCESS
} from "../actions/bookActions.js";

import { toast } from "react-toastify";

const initialState = {
  fetchingBooks: false,
  books: [],
  singleBook: {},
  singleCheckedOutBook: {}
};

export default function bookReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_BOOKS:
      return {
        ...state,
        fetchingBooks: true
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        fetchingBooks: false,
        books: action.payload
      };
    case ADDING_BOOK:
      return {
        ...state,
        fetchingBooks: true
      };
    case ADDING_BOOK_SUCCESS:
      toast.info("Book successfully added.");
      return {
        ...state,
        fetchingBooks: false
        // ^^^ THIS SUCKS CHANGE IT
      };
    case GETTING_SINGLE_BOOK:
      return {
        ...state,
        fetchingBooks: true
      };
    case GET_SINGLE_BOOK_SUCCESS:
      return {
        ...state,
        fetchingBooks: false,
        singleBook: action.payload
      };
    case GETTING_SINGLE_CHECKED_OUT_BOOK:
      return {
        ...state,
        fetchingBooks: true
      };
    case GET_SINGLE_CHECKED_OUT_BOOK_SUCCESS:
      return {
        ...state,
        fetchingBooks: false,
        singleCheckedOutBook: action.payload
      };
    default:
      return state;
  }
}
