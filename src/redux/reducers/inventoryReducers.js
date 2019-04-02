import {
  GETTING_USERS_INVENTORY,
  GET_USERS_INVENTORY_SUCCESS,
  GETTING_SINGLE_INVENTORY,
  GET_SINGLE_INVENTORY_SUCCESS,
  EDITING_INVENTORY,
  EDIT_INVENTORY_SUCCESS,
  DELETING_INVENTORY,
  DELETE_INVENTORY_SUCCESS
} from "../actions/inventoryActions.js";

const initialState = {
  loadingInventory: false,
  inventory: [],
  singleInventory: {}
};

export default function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case GETTING_USERS_INVENTORY:
      return {
        ...state,
        loadingInventory: true
      };
    case GET_USERS_INVENTORY_SUCCESS:
      return {
        ...state,
        loadingInventory: false,
        inventory: action.payload
      };
    case GETTING_SINGLE_INVENTORY:
      return {
        ...state,
        loadingInventory: true
      };
    case GET_SINGLE_INVENTORY_SUCCESS:
      return {
        ...state,
        loadingInventory: false,
        singleInventory: action.payload
      };
    case EDITING_INVENTORY:
      return {
        ...state,
        loadingInventory: true
      };
    case EDIT_INVENTORY_SUCCESS:
      return {
        ...state,
        loadingInventory: false,
        singleInventory: action.payload
      };
    case DELETING_INVENTORY:
      return {
        ...state,
        loadingInventory: true
      };
    case DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
        loadingInventory: false
      };
    default:
      return state;
  }
}
