import {
  FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  GETTING_FIRST_USER,
  GET_FIRST_USER_SUCCESS,
  UPDATING_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  ADDING_BOOK,
  ADDING_BOOK_SUCCESS,
  GETTING_SINGLE_INVENTORY,
  GET_SINGLE_INVENTORY_SUCCESS,
  GETTING_SINGLE_BOOK,
  GET_SINGLE_BOOK_SUCCESS
} from "./actions";

const initialState = {
  loading: false,
  users: [],
  loggedInUser: {},
  updatingInfo: false,
  inventory: [],
  books: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case GETTING_FIRST_USER:
      return {
        ...state,
        loading: true
      };
    case GET_FIRST_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload
      };
    case UPDATING_PROFILE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload
      };
    case ADDING_BOOK:
      return {
        ...state,
        loading: true
      };
    case ADDING_BOOK_SUCCESS:
      return {
        ...state,
        loading: false
        // ^^^ THIS SUCKS CHANGE IT
      };
    case GETTING_SINGLE_INVENTORY:
      return {
        ...state,
        loading: true
      };
    case GET_SINGLE_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: action.payload
      };
    case GETTING_SINGLE_BOOK:
      return {
        ...state,
        loading: true
      };
    case GET_SINGLE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
