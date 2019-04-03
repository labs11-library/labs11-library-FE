import {
  GETTING_CHECKOUT_REQUESTS,
  GET_CHECKOUT_REQUESTS_SUCCESS,
  ADDING_CHECKOUT_REQUEST,
  ADD_CHECKOUT_REQUEST_SUCCESS,
  GETTING_SINGLE_REQUEST,
  GET_SINGLE_REQUEST_SUCCESS
} from "../actions/checkoutActions.js";

const initialState = {
  checkoutRequests: [],
  singleCheckoutRequest: {},
  loadingRequests: false
};

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_CHECKOUT_REQUESTS:
      return {
        ...state,
        loadingRequests: true
      };
    case GET_CHECKOUT_REQUESTS_SUCCESS:
      return {
        ...state,
        loadingRequests: false,
        checkoutRequests: action.payload
      };
    case GETTING_SINGLE_REQUEST:
      return {
        ...state,
        loadingRequests: true
      };
    case GET_SINGLE_REQUEST_SUCCESS:
      return {
        ...state,
        loadingRequests: false,
        singleCheckoutRequest: action.payload
      };
    case ADDING_CHECKOUT_REQUEST:
      return {
        ...state,
        loadingRequests: true
      };
    case ADD_CHECKOUT_REQUEST_SUCCESS:
      return {
        ...state,
        loadingRequests: false
      };
    default:
      return state;
  }
}
