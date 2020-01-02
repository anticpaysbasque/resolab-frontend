import axios from "axios";
import { connect } from "react-redux";

const AxiosInstance = axios.create({
  baseURL: `http://localhost:8089`,
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
    Accept: "application/json"
  }
});

export default connect()(AxiosInstance);
