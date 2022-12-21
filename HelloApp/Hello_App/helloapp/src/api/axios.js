import axios from "axios";
const base_Url = "http://localhost:4000";

export default axios.create({
  baseURL: base_Url,
});

export const privateAxios = axios.create({
  baseURL: base_Url,
  headers: { 
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
  