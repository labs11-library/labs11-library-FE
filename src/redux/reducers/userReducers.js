import { FETCHING_USERS, FETCH_USERS_SUCCESS } from "../actions/userActions.js";

const initialState = {
  loadingUsers: false,
  users: []
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
    default:
      return state;
  }
}
