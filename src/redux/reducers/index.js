import { combineReducers } from "redux";
import authReducer from "./authReducers.js";
import bookReducer from "./bookReducers.js";
import inventoryReducer from "./inventoryReducers.js";
import userReducer from "./userReducers.js";
import reviewReducer from "./reviewReducers.js";

export default combineReducers({
  authReducer,
  bookReducer,
  inventoryReducer,
  userReducer,
  reviewReducer
});
