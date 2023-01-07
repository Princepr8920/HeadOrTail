import axios from "axios";
const base_Url = "http://localhost:4000";

export default axios.create({
  baseURL: base_Url,
});

export const privateAxios = axios.create({
  baseURL: base_Url,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});
