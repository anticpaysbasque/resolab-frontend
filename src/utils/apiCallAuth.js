import axios from "axios";
import store from "../store";

const apiUrl = process.env.REACT_APP_API_URL;

// const { authReducer } = store.getState();
// const token = authReducer.token;

// console.log(token);

const AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
    Accept: "application/json"
  }
});

export default AxiosInstance;

// `http://localhost:8089/api`
