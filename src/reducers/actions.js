import { LOGIN, SET_USER, LOG_OUT } from "./actionTypes";

export const storeToken = token => dispatch => {
  dispatch({ type: LOGIN, payload: token });
  sessionStorage.setItem("token", token);
  return;
};

export const setUser = user => dispatch => {
  return dispatch({ type: SET_USER, payload: user });
};

export const removeToken = () => dispatch => {
  dispatch({ type: LOG_OUT });
  sessionStorage.clear("token");
  return;
};
