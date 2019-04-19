import {
  GETTING_CHECKOUT_REQUESTS,
  GET_CHECKOUT_REQUESTS_SUCCESS,
  ADDING_CHECKOUT_REQUEST,
  ADD_CHECKOUT_REQUEST_SUCCESS,
  ADD_CHECKOUT_REQUEST_FAILURE,
  DELETING_CHECKOUT_REQUEST,
  DELETE_CHECKOUT_REQUEST_SUCCESS,
  GETTING_SINGLE_REQUEST,
  GET_SINGLE_REQUEST_SUCCESS,
  ADDING_CHECKOUT,
  ADD_CHECKOUT_SUCCESS,
  GETTING_CHECKOUTS,
  GET_CHECKOUTS_SUCCESS,
  GETTING_SINGLE_CHECKOUT,
  GET_SINGLE_CHECKOUT_SUCCESS,
  DELETING_CHECKOUT,
  DELETE_CHECKOUT_SUCCESS,
  SETTING_LATE_FEE,
  SET_LATE_FEE_SUCCESS
} from "../actions/checkoutActions.js";

import { toast } from "react-toastify";

const initialState = {
  checkoutRequests: [],
  singleCheckoutRequest: {},
  loadingRequests: false,
  checkouts: [],
  singleCheckout: {},
  loadingCheckouts: false,
  deletingCheckout: false,
  error: ""
};

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_CHECKOUT_REQUESTS:
      return {
        ...state,
        loadingRequests: true,
        error: ""
      };
    case GET_CHECKOUT_REQUESTS_SUCCESS:
      return {
        ...state,
        loadingRequests: false,
        checkoutRequests: action.payload,
        error: ""
      };
    case GETTING_SINGLE_REQUEST:
      return {
        ...state,
        loadingRequests: true,
        error: ""
      };
    case GET_SINGLE_REQUEST_SUCCESS:
      return {
        ...state,
        loadingRequests: false,
        singleCheckoutRequest: action.payload,
        error: ""
      };
    case ADDING_CHECKOUT_REQUEST:
      return {
        ...state,
        loadingRequests: true,
        error: ""
      };
    case ADD_CHECKOUT_REQUEST_SUCCESS:
      toast.info("Please coordinate an exchange in the message thread.", {
        autoClose: false
      });
      return {
        ...state,
        loadingRequests: false,
        error: ""
      };
    case ADD_CHECKOUT_REQUEST_FAILURE:
      toast.error(
        "You already have a pending request for this book. Contact the owner to coordinate an exchange.",
        {
          autoClose: false
        }
      );
      return {
        ...state,
        error: action.payload,
        loadingRequests: false
      };
    case DELETING_CHECKOUT_REQUEST:
      return {
        ...state,
        deletingCheckout: true
      };
    case DELETE_CHECKOUT_REQUEST_SUCCESS:
      toast.info("Checkout request successfully deleted.");
      return {
        ...state,
        deletingCheckout: false
      };
    case ADDING_CHECKOUT:
      return {
        ...state,
        loadingCheckouts: true,
        error: ""
      };
    case ADD_CHECKOUT_SUCCESS:
      toast.info("Checkout confirmed.");
      return {
        ...state,
        loadingCheckouts: false,
        error: ""
      };
    case GETTING_CHECKOUTS:
      return {
        ...state,
        loadingCheckouts: true,
        error: ""
      };
    case GET_CHECKOUTS_SUCCESS:
      return {
        ...state,
        loadingCheckouts: false,
        checkouts: action.payload,
        error: ""
      };
    case GETTING_SINGLE_CHECKOUT:
      return {
        ...state,
        loadingCheckouts: true,
        error: ""
      };
    case GET_SINGLE_CHECKOUT_SUCCESS:
      return {
        ...state,
        loadingCheckouts: false,
        singleCheckout: action.payload,
        error: ""
      };
    case DELETING_CHECKOUT:
      return {
        ...state,
        loadingCheckouts: true,
        error: ""
      };
    case DELETE_CHECKOUT_SUCCESS:
      toast.info("Book return confirmed.");
      return {
        ...state,
        loadingCheckouts: false,
        error: ""
      };
    case SETTING_LATE_FEE:
      return {
        ...state,
        loadingCheckouts: true
      };
    case SET_LATE_FEE_SUCCESS:
      return {
        ...state,
        loadingCheckouts: false
      };
    default:
      return state;
  }
}
