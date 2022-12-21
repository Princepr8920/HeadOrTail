 import axios from "../../api/axios";
import noNested from "../../modules/noNested";
 
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
      return noNested(getData, ["status", "message", "data"], ["data"]);
    }  catch (err) {
      const error = err.response
        ? noNested(err, ["status", "data"], ["data"])
        : {
            data: {
              message: err.message || "something went wrong",
              status: err.request.status || 500,
              success: false,
            },
          };
      return error;
    }
  }

  return GET;
}