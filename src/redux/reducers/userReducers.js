import {
  FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  CREATE_CUSTOMER_START,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILURE,
  FETCHING_SINGLE_USER,
  FETCH_SINGLE_USER_SUCCESS
} from "../actions/userActions.js";

const initialState = {
  loadingUsers: false,
  users: [],
  singleUser: {},
  isCreatingCustomer: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS:
      return {
        ...state,
        loadingUsers: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        users: action.payload
      };
    case CREATE_CUSTOMER_START:
      return {
        ...state,
        isCreatingCustomer: true
      };
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isCreatingCustomer: false
      };
    case CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        isCreatingCustomer: false
      };
    case FETCHING_SINGLE_USER:
      return {
        ...state,
        loadingUsers: true
      };
    case FETCH_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        singleUser: action.payload
      };
    default:
      return state;
  }
}
