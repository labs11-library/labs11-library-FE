import {
  GETTING_LOGGED_IN_USER,
  GET_LOGGED_IN_USER_SUCCESS,
  UPDATING_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  CREATING_STRIPE_CUSTOMER,
  CREATE_STRIPE_CUSTOMER_SUCCESS
} from "../actions/authActions.js";

import { toast } from "react-toastify";

const initialState = {
  loggedInUser: {},
  fetchingUser: false,
  creatingStripe: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_LOGGED_IN_USER:
      return {
        ...state,
        fetchingUser: true
      };
    case GET_LOGGED_IN_USER_SUCCESS:
      return {
        ...state,
        fetchingUser: false,
        loggedInUser: action.payload
      };
    case UPDATING_PROFILE:
      return {
        ...state,
        fetchingUser: true
      };
    case UPDATE_PROFILE_SUCCESS:
      toast.info("Profile successfully updated.");
      return {
        ...state,
        fetchingUser: false,
        loggedInUser: action.payload
      };
    case CREATING_STRIPE_CUSTOMER:
      return {
        ...state,
        creatingStripe: true
      };
    case CREATE_STRIPE_CUSTOMER_SUCCESS:
      return {
        ...state,
        creatingStripe: false
      };
    default:
      return state;
  }
}
