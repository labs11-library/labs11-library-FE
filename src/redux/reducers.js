import { FETCHING_USERS, FETCH_USERS_SUCCESS } from "./actions";

const initialState = {
  loading: false,
  users: [],
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
    default:
      return state;
  }
};

export default rootReducer;
