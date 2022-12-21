import axios from "../../api/axios";
import noNested from "../../modules/noNested";

export default function usePatchHook() {
  async function PATCH(info, link) {
    let url = `/${link}`;

    let data = JSON.stringify(info);
    let option = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
 
    try {
      const sendData = await axios.patch(url, data, option);   
      return noNested(sendData, ["status", "message", "data"], ["data"]);
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

  return PATCH;
}
