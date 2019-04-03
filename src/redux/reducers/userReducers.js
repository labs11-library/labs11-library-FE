import {
  FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  CREATE_CUSTOMER_START,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAILURE
} from "../actions/userActions.js";

const initialState = {
  loadingUsers: false,
  users: [],
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
      console.log("Customer Created!");
      return {
        ...state,
        isCreatingCustomer: false
      };
    case CREATE_CUSTOMER_FAILURE:
      console.log("Customer Could Not Be Created");
      return {
        ...state,
        isCreatingCustomer: false
      };
    default:
      return state;
  }
}

// export default function stripeReducer(state = initialState, action) {
//   switch (action.type) {
//     case CREATE_CUSTOMER_START:
//       return {
//         ...state,
//         isCreatingCustomer: true
//       };
//     case CREATE_CUSTOMER_SUCCESS:
//       console.log("Customer Created!")
//       return {
//         ...state,
//         isCreatingCustomer: false
//       };
//     case CREATE_CUSTOMER_FAILURE:
//       console.log("Customer Could Not Be Created")
//       return {
//         ...state,
//         isCreatingCustomer: false
//       };
//   }
// }
