import axios from "lib/defaultClient";

export const localRegister = ({ email, password }) =>
  axios.post("/api/auth/register/local", { email, password });

export const localLogin = ({ email, password }) =>
  axios.post("/api/auth/login/local", { email, password });

export const logout = () => axios.post("/api/auth/logout");

export const check = () => axios.get("/api/auth/check");
