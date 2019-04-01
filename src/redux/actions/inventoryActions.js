import axios from "axios";
import baseUrl from "../../url";
// const baseUrl = "http://localhost:9001";
// const baseUrl = "https://book-maps.herokuapp.com";

export const GETTING_USERS_INVENTORY = "GETTING_USERS_INVENTORY";
export const GET_USERS_INVENTORY_SUCCESS = "GET_USERS_INVENTORY_SUCCESS";

export const GETTING_SINGLE_INVENTORY = "GETTING_SINGLE_INVENTORY";
export const GET_SINGLE_INVENTORY_SUCCESS = "GET_SINGLE_INVENTORY_SUCCESS";

export const getAllInventory = () => dispatch => {
  let userId = localStorage.getItem("userId");
  dispatch({ type: GETTING_USERS_INVENTORY });
  axios
    .get(`${baseUrl}/users/${userId}/inventory`)
    .then(res => {
      dispatch({
        type: GET_USERS_INVENTORY_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getSingleInventory = (userId, bookId) => dispatch => {
  dispatch({ type: GETTING_SINGLE_INVENTORY });
  axios
    .get(`${baseUrl}/users/${userId}/inventory/${bookId}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_INVENTORY_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
