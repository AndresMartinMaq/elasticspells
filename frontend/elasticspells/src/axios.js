import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : window.location.origin;

axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
