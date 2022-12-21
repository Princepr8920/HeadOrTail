 

import axios from "../api/axios";

export default function useGetHook() {
  async function GET(link) {
    let url = `/${link}`;
    let option = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    try {
      const getData = await axios.get(url, option);
      return getData;
    } catch (err) {
      console.log(err)
      const error = err.response;
      return error;
    }
  }

  return GET;
}