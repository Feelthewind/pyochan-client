import axios from "axios";

axios.defaults.withCredentials = true;

const defaultClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "/" : "https://api.pyochan.com/",
  withCredentials: true
});

// if (process.env.APP_ENV === "server") {
//   defaultClient.defaults.timeout = 3000;
// }

export default defaultClient;
