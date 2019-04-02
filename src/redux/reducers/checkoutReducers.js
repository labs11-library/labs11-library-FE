import {
  GETTING_CHECKOUT_REQUESTS,
  GET_CHECKOUT_REQUESTS_SUCCESS
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
    default:
      return state;
  }
}
