import axios from "axios";
import serverIP from "../config"

const API_URL = serverIP + "login";

export const handleLogin = ({ login, password }) => {
  return axios.post(API_URL, {
    login: login,
    password: password,
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};

const saveToken = (token) => {
  localStorage.setItem("token", token);
};

const handleRemove = () => {
  localStorage.removeItem("token");
};