import axios from "axios";
import { connect } from "react-redux";

const apiUrl = process.env.REACT_APP_API_URL;

const AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
    Accept: "application/json"
  }
});

export default connect()(AxiosInstance);

// `http://localhost:8089/api`
