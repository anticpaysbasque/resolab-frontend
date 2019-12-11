import { LOGIN, SET_USER } from "./actionTypes";

export const storeToken = token => dispatch => {
  dispatch({ type: LOGIN, payload: token });
  sessionStorage.setItem("token", token);
  return;
};

export const setUser = user => dispatch => {
  return dispatch({ type: SET_USER, payload: user });
};
