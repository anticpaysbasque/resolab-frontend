import axios from "axios";
import { connect } from "react-redux";

const AxiosInstance = axios.create({
  baseURL: `http://localhost:8089/api`,
  headers: { Authorization: "Bearer " + sessionStorage.getItem("token") }
});

export default connect()(AxiosInstance);
