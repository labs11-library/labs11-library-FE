import axios from "axios";
import baseUrl from "../../url";
// const baseUrl = "http://localhost:9001";
// const baseUrl = "https://book-maps.herokuapp.com";

export const GETTING_USERS_INVENTORY = "GETTING_USERS_INVENTORY";
export const GET_USERS_INVENTORY_SUCCESS = "GET_USERS_INVENTORY_SUCCESS";

export const GETTING_SINGLE_INVENTORY = "GETTING_SINGLE_INVENTORY";
export const GET_SINGLE_INVENTORY_SUCCESS = "GET_SINGLE_INVENTORY_SUCCESS";

export const EDITING_INVENTORY = "EDITING_INVENTORY";
export const EDIT_INVENTORY_SUCCESS = "EDIT_INVENTORY_SUCCESS";

export const DELETING_INVENTORY = "DELETING_INVENTORY";
export const DELETE_INVENTORY_SUCCESS = "DELETE_INVENTORY_SUCCESS";

export const getAllInventory = userId => dispatch => {
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

export const editInventory = (userId, bookId, state) => dispatch => {
  dispatch({ type: EDITING_INVENTORY });
  axios
    .put(`${baseUrl}/users/${userId}/inventory/${bookId}`, state)
    .then(res => {
      dispatch({
        type: GET_USERS_INVENTORY_SUCCESS,
        payload: res.data.editedBook
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteInventory = (userId, bookId) => dispatch => {
  dispatch({ type: DELETING_INVENTORY });
  axios
    .delete(`${baseUrl}/users/${userId}/inventory/${bookId}`)
    .then(res => {
      dispatch({
        type: DELETE_INVENTORY_SUCCESS,
        payload: res.data.message
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const returnBook = bookId => dispatch => {
  const userId = localStorage.getItem('userId')
  dispatch({ type: EDITING_INVENTORY });
  axios
    .put(`${baseUrl}/users/${userId}/inventory/${bookId}`, { available: true })
    .then(res => {
      dispatch({
        type: GET_USERS_INVENTORY_SUCCESS,
        payload: res.data.editedBook
      });
    })
    .catch(err => {
      console.log(err);
    });
};